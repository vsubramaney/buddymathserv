Rest based service for buddymath to 

GET Operations
   1. get the list of mathematical problems

request -   
http://buddymathserv-learnnplay.rhcloud.com/allproblems

response -
[
   {
      question: "What is percentage of <sup>2</sup>&frasl;<sub>7</sub> ? (round off to 2 decimals)",
      imageId: "",
      choiceType: "RB",
      choiceOptions: "[14.29, 15, 14]",
      rules: "[TIME, CHALLENGE, LEISURE]",
      group: "[M, 11]",
      correct: "[14.29]",
      time: "30",
      tag: "['Ratio','Percentage']",
      _id: "52de0a1e26fa0a203b2cf9d9",
      __v: 0
   }
] 
   
   2. get a single mathematical problem

request -
http://buddymathserv-learnnplay.rhcloud.com/getNProblems?n=1&pageNo=1   

response -
[
   {
      question: "What is percentage of <sup>2</sup>&frasl;<sub>7</sub> ? (round off to 2 decimals)",
      imageId: "",
      choiceType: "RB",
      choiceOptions: "[14.29, 15, 14]",
      rules: "[TIME, CHALLENGE, LEISURE]",
      group: "[M, 11]",
      correct: "[14.29]",
      time: "30",
      tag: "['Ratio','Percentage']",
      _id: "52de0a1e26fa0a203b2cf9d9",
      __v: 0
   }
] 

POST Operations
   1. create a mathematical problem
request -
use a Rest client with URI - 
http://buddymathserv-learnnplay.rhcloud.com/createProblem
and body as 
	{
           "question": "What is percentage of <sup>2</sup>&frasl;<sub>7</sub> ? (round off to 2 decimals)", 
            "imageId": "",  
           "choiceType": "RB", 
           "choiceOptions":"[14.29, 15, 14]",
           "rules": "[TIME, CHALLENGE, LEISURE]", 
           "group": "[M, 11]", 
           "correct": "[14.29]", 
           "hintId": "1", 
           "time": 30, 
           "tag": "['Ratio','Percentage']" 
       }
   
Response - 200 [OK]

