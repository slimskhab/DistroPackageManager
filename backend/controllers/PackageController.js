const Package = require("../models/PackageModel");
const Counter = require("../models/CounterModel");
const Repository = require("../models/RepositoryModel");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const url = require('url');
const User = require("../models/UserModel");
const Notification = require("../models/NotificationModel");
const addPackage=async(req,res)=>{
    try {
      const {packageName,packageRepository}=req.body;

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalPackage" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const repository=await Repository.findOne({repositoryTitle:packageRepository})
    if(!repository){
      return res.status(404).json({ message: "repository not found" });
    }
   
    const package = new Package({
      id: counter.seq,
      packageName,
      packageRepository
    });

    await package.save();

    res.status(201).json({
      status: "success",
      message: "Added Package",
      package
    });
    } catch (error) {
      console.log(error)
        return res.status(500).json({ error: 'Server Error!' });

    }
}

const getAllPackages=async (req,res)=>{
  try{
      const packages=await Package.find({})
      return res.status(200).json({
          status: "success",
          message: "Packages retrieved",
          packages
        }); 
  }catch(e){
      console.error(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}

const deletePackage = async (req, res) => {
  try {
    const packageId = req.body.packageId;

    const deletedPackage = await Package.findOneAndDelete({
      id: packageId,
    });

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Package deleted",
      package: deletedPackage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const getRecentlyFetchedPackages = async (req, res) => {
  try {
    const recentlyFetchedPackages = await Package.find({}).sort({ updatedAt: -1 }).limit(10);
    res.status(200).json({
      status: "success",
      message: "Recently fetched packages retrieved",
      packages: recentlyFetchedPackages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
const getTotalMissRateAndPackageCount = async (req, res) => {
  try {
    const packages = await Package.find({});
    const allRepos = await Repository.find({});
    
    let totalMissRate = 0;
    let totalPackageSize = 0;
    let totalPackages = packages.length;

    // Initialize variables for biggest and smallest packages
    let biggestPackage = { packageName: "", packageSize: 0 };
    let smallestPackage = { packageName: "", packageSize: Infinity };

    packages.forEach(pkg => {
      totalMissRate += pkg.hitMissRate;
      totalPackageSize += pkg.packageSize;

      // Update biggest and smallest packages if necessary
      if (pkg.packageSize > biggestPackage.packageSize) {
        biggestPackage = { packageName: pkg.packageName, packageSize: pkg.packageSize };
      }
      if (pkg.packageSize < smallestPackage.packageSize) {
        smallestPackage = { packageName: pkg.packageName, packageSize: pkg.packageSize };
      }
    });

    const averageMissRate = totalMissRate / totalPackages;
    const averagePackageSize = totalPackageSize / totalPackages;

    // Calculate biggest and smallest repository
    let biggestRepo = { repositoryTitle: "", repositorySize: 0 };
    let smallestRepo = { repositoryTitle: "", repositorySize: Infinity };

    allRepos.forEach(repo => {
      if (repo.repositorySize > biggestRepo.repositorySize) {
        biggestRepo = { repositoryTitle: repo.repositoryTitle, repositorySize: repo.repositorySize };
      }
      if (repo.repositorySize < smallestRepo.repositorySize) {
        smallestRepo = { repositoryTitle: repo.repositoryTitle, repositorySize: repo.repositorySize };
      }
    });

    const repositories = {};
    packages.forEach(pkg => {
      if (repositories[pkg.packageRepository]) {
        repositories[pkg.packageRepository]++;
      } else {
        repositories[pkg.packageRepository] = 1;
      }
    });
    const mostActiveRepository = Object.keys(repositories).reduce((a, b) => repositories[a] > repositories[b] ? a : b);

    const totalHitRate = packages.reduce((acc, pkg) => acc + pkg.hitMissRate, 0);
    const averageHitRate = totalHitRate / totalPackages;

    const activePackages = packages.filter(pkg => pkg.numberOfDownloads > 0).length;

    const repositorySizes = {};
    packages.forEach(pkg => {
      if (repositorySizes[pkg.packageRepository]) {
        repositorySizes[pkg.packageRepository] += pkg.packageSize;
      } else {
        repositorySizes[pkg.packageRepository] = pkg.packageSize;
      }
    });
    const largestRepositorySize = Math.max(...Object.values(repositorySizes));
    const largestRepository = Object.keys(repositorySizes).find(key => repositorySizes[key] === largestRepositorySize);

    res.status(200).json({
      status: "success",
      message: "Total miss rate and additional stats calculated",
      stats: {
        totalMissRate: averageMissRate,
        totalPackages: totalPackages,
        totalPackageSize: totalPackageSize,
        averagePackageSize,
        mostActiveRepository,
        averageHitRate,
        activePackages,
        largestRepository,
        totalRepositories: allRepos.length,
        biggestPackage,
        smallestPackage,
        biggestRepo,
        smallestRepo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};


const getTopFetchedPackages = async (req, res) => {
  try {
    const topFetchedPackages = await Package.find({}).sort({ numberOfDownloads: -1 }).limit(10);
    res.status(200).json({
      status: "success",
      message: "Top fetched packages retrieved",
      packages: topFetchedPackages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
const downloadPackage = async (req, res) => {
  const filePath = req.params.path + (req.params[0] || '');
  const host = req.headers.host;
  const protocol = req.protocol;
  const userIP = req.connection.remoteAddress;
  console.log(userIP)
  const counter = await Counter.findOneAndUpdate(
    { id: "autovaluser" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
);
  var user =await User.findOne({userIp:userIP})
  if(!user){
    user = new User({id:counter.seq, userIp: userIP, packagesUploaded: 1 });
  }else{
    user.packagesUploaded++;
  }
  await user.save();

  const downloadUrl = url.resolve(`${protocol}://archive.ubuntu.com/`, filePath);
  console.log(downloadUrl)
  const filePathSplited = filePath.split("/");
  const fileName = filePathSplited[filePathSplited.length - 1];
  const directoryPath = filePathSplited.slice(0, -1).join("/")
  const downloadsDirectory = path.join(__dirname, `../${directoryPath}`);
  if (!fs.existsSync(downloadsDirectory)) {
      fs.mkdirSync(downloadsDirectory, { recursive: true });
  }

  const notification=new Notification({
    notificationContent:`User with IP: ${userIP} fetched package: ${fileName}`,
    notificationType:"Package fetched",
  })
  await notification.save()
  try {
      const packageExists = await Package.findOne({ packageName: fileName, status: "Available" })
      if (packageExists) {
          console.log(`Package exists: ${packageExists.packageName}`);
          const filePathOnServer = path.join(downloadsDirectory, fileName);
          packageExists.numberOfDownloads++;
          packageExists.hits++;
          packageExists.hitMissRate=packageExists.hits/packageExists.numberOfDownloads
          await packageExists.save();

          res.setHeader('Content-Type', 'application/octet-stream');
          res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

          const fileReaderStream = fs.createReadStream(filePathOnServer);
          fileReaderStream.pipe(res);
      } else {
          console.log("Package doesn't exist");
          const response = await axios.get(downloadUrl, {
              responseType: 'stream',
              headers: {
                  'Content-Type': 'application/octet-stream',
                  'Content-Disposition': `attachment; filename=${fileName}`,
              },
          });

          const filePathOnServer = path.join(downloadsDirectory, fileName);
          const fileWriterStream = fs.createWriteStream(filePathOnServer);

          response.data.pipe(fileWriterStream);

          let fileSizeInBytes = 0;

          fileWriterStream.on('finish', async () => {
              const stats = fs.statSync(filePathOnServer);
              fileSizeInBytes = stats.size;

              res.setHeader('Content-Type', 'application/octet-stream');
              res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

              const fileReaderStream = fs.createReadStream(filePathOnServer);
              fileReaderStream.pipe(res);

              const counter = await Counter.findOneAndUpdate(
                  { id: "autovalproduct" },
                  { $inc: { seq: 1 } },
                  { new: true, upsert: true }
              );

              const repository=await Repository.findOneAndUpdate({repositoryTitle:"Repo 1"},{ $inc: { numberOfPackages: 1,repositorySize: fileSizeInBytes}})

              const newPackage = new Package({
                  id: counter.seq,
                  packageName: fileName,
                  numberOfDownloads: 1,
                  hitMissRate: 1,
                  misses:1,
                  packageStatus: 'Available',
                  packageSize: fileSizeInBytes,
                  packageRepository: "Repo 1"
              });

              await newPackage.save();
          });

          fileWriterStream.on('error', (error) => {
              console.error('Error saving file:', error.message);
              res.status(500).send('Internal Server Error');
          });
      }
  } catch (error) {
      console.error('Error downloading and saving file:', error.message);
      res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  addPackage,
  getAllPackages,
  deletePackage,
  downloadPackage,
  getRecentlyFetchedPackages,
  getTopFetchedPackages,
  getTotalMissRateAndPackageCount
};