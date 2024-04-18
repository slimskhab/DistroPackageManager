import 'package:flutter/material.dart';

class StatisticsCard extends StatelessWidget {
   StatisticsCard({super.key,required this.icon,required this.number,required this.title,required this.content});

  IconData icon;
  String number;
  String title;
  String content;
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(5),
          border: Border.all(color: Colors.grey,width: 1)
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: EdgeInsets.symmetric(vertical: 10,horizontal: 20),
            child: Text(title,style: TextStyle(fontWeight: FontWeight.w700,fontSize: 20)),
          ),
          Row(
            children: [
              Expanded(child: Container(
                height: 1,
                color: Colors.grey,
              ))

            ],
          ),
          Container(
            padding: EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(content),
                Row(
                  children: [
                    Icon(icon),
                    SizedBox(width: 5,),
                    Text(number,style: TextStyle(fontWeight: FontWeight.w700,fontSize: 20))
                  ],
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
