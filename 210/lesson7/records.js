// Exercise: Class Records Summary

// One of the things that faculty do at the end of term is to make a class record summary of students based on the weighted scores of exams and exercises.

// Exams and Exercises

// The grading areas are exams and exercises, with the following weight:

// Grading Area	Weight
// Exam	65%
// Exercises	35%
// Each standard term has 4 exams, and several exercises. Every exam has a fixed total possible score of 100. Exercises, on the other hand, have varying score values and count, but the total value of exercise values always add up to 100. For example, a given term may have 5 exercises with possible total scores of [30, 20, 10, 20, 20] while another term may have 3 exercises with possible total scores of [20, 30, 50].

// When determing a student's grade, we'll first get a student's average score from the 4 exams, then add up all the exercise scores to get a number (out of 100). Then we'll apply the weights to get a final score, and use the following table to get the letter equivalent:

// Percent Grade	Letter Equivalent
// 93 - 100	A
// 85 - 92	B
// 77 - 84	C
// 69 - 76	D
// 60 - 68	E
// 0 - 59	F
// Let's work through an example. For a term with 3 exercises of [20, 30, 50], a student got [90, 80, 95, 70] on her 4 exams, and [20, 15, 40] on her exercises. We'll go through the following steps to get her final score:


// 1. Student average exam score: (90 + 80 + 95 + 71) / 4 = 84;
// 2. Student exercise score: 20 + 15 + 40 = 75;
// 3. Apply weights to get the final score: 84 * .65 + 75 * .35 = 80.85,
//    and round to the nearest integer: 81
// 4. The student's final score is expressed as "81 (C)", after looking up in the table above.

// Source Data and Class Record Summary Format

// The source data is in the format of student id and scores:

// var studentScores = {
//   student1: {
//     id: <idNumber>,
//     scores: {
//       exams: [],
//       exercises: []
//     },
//   },
//   student2: {
//     id: <idNumber>,
//     scores: {
//       exams: [],
//       exercises: []
//     },
//   },
//   student3: {
//     id: <idNumber>,
//     scores: {
//       exams: [],
//       exercises: []
//     },
//   },
//   studentN: {
//     id: <idNumber>,
//     scores: {
//       exams: [],
//       exercises: []
//     },
//   },
// };


// The class record summary needs to be in the format of:

// {
//   studentGrades: [ '93 (A)', '81 (C)', '86 (B)', '100 (A)', '69 (D)' ],
//   exams: [
//     { average: 75.6, minimum: 50, maximum: 100 },
//     { average: 86.4, minimum: 70, maximum: 100 },
//     { average: 87.6, minimum: 60, maximum: 100 },
//     { average: 91.8, minimum: 80, maximum: 100 }
//   ],
// }
// The exam averages should round to one digit after the decimal point.



// My Thinking

//
// 1 term = 4 exams + n * exercises
// score exam 100 (0.65), exercises(0.35) sum 100
//
// grade
//    precentGrade = 0.65 * average of 4 exams + 0.35 * sum of exercise
//    
//     letterGrade = map to letter equivalent
//
// output:
//    studennts' precentGrad (letterGrad) in array
//    average, min, max of 4 exams in array   
//
// process
//    grade -> map
//    exam -> map
//
//


var studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

function generateClassRecordSummary(scores) {
  // grades
  var studentGrades = Object.keys(scores).map(function(student, index){
    return generateGrade(scores[student].scores);
  });

  // exam summary fixme
  var studentExams = []; 
  Object.keys(scores).forEach(function(student, index){
    studentExams[index] = scores[student].scores.exams;
  });

  var exams = [];
  studentExams.forEach(function(row, rowIndex){
    row.forEach(function(column, colIndex) {
      if (exams[colIndex]) {
        exams[colIndex].push(column);
      } else {
        exams[colIndex] = [];
        exams[colIndex].push(column);
      }
    })
  });

  var examSummary = exams.map(function(scores) {
    return generateScoreSummary(scores);
  })

  //return generateExamSummary(scores[student].scores.exams);
  return {
    'studentGrades': studentGrades,
    'exams': examSummary
  };
};

// input array of exams
// output object that contains averyage, min, max of 4 exams, regardless students
// not group by student, group by exams
function generateScoreSummary(scores) {
  var sum = 0;
  var min = Infinity;
  var max = -Infinity;
  var count = scores.length;
  scores.forEach(function(score) {
    sum = sum + score;
    min = Math.min(score, min);
    max = Math.max(score, max);
  });

  return {
    'average': sum / count,
    'minimum': min,
    'maximum': max
  };
}

function generateGrade(scores) {
  var examsSum = scores.exams.reduce(function(sum, element) {
    return sum + element;
  }, 0);

  var exercisesSum = scores.exercises.reduce(function(sum, element) {
    return sum + element;
  }, 0);

  var grade = Math.round(examsSum / 4 * 0.65 + exercisesSum * 0.35);

  return String(grade) + ' (' + gradePrecentToletter(grade) + ')';
}

function gradePrecentToletter(number){
  if (number >= 93 && number <= 100) {
    return 'A';
  } else if (number >= 85 && number <= 92) {
    return 'B';
  } else if (number >= 77 && number <= 84) {
    return 'C';
  } else if (number >= 69 && number <= 76) {
    return 'D';
  } else if (number >= 60 && number <= 68) {
    return 'E';
  } else if (number >= 0 && number <= 59) {
    return 'F';
  } else {
    return 'n/a';
  }
}

console.log(generateClassRecordSummary(studentScores));



// returns:

// {
//   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
//   exams: [
//     { average: 75.6, minimum: 50, maximum: 100 },
//     { average: 86.4, minimum: 70, maximum: 100 },
//     { average: 87.6, minimum: 60, maximum: 100 },
//     { average: 91.8, minimum: 80, maximum: 100 },
//   ],
// }


// Thinking in Abstractions
// This problem may feel a bit overwhelming at first, and it can be if you try to solve everything at once. Instead, looking at the desired return value of the function, we know it needs two piece of data:

// an array of student grades, in a specific format. Each student grade needs to be calcuated from that student's exam and exercise scores.
// an array of exam summary objects. Each exam summary object needs to be calcuated from all students' scores for that exam.
// We can then rely on the above two pieces of insights to write out the skeleton of our solution:

// function generateClassRecordSummary(scores) {
//   // an array of score objects, with both exams and exercises
//   var scoreData = Object.keys(scores).map(function(student) {
//     return scores[student].scores;
//   });

//   // transform the above score objects to be an array of arrays for exam scores
//   var examData = scoreData.map(function(score) {
//     return score.exams;
//   });

//   return {
//     studentGrades: scoreData.map(function(scoreObj) {
//       return getStudentScore(scoreObj);
//     }),
//     exams: getExamSummary(examData);
//   }
// }

// function getStudentScore(scoreObj) {
//   // ...
// }

// function getExamSummary(examData) {
//   // ...
// }
// Now we have turned the original bigger problem into two much smaller problems, each with just the data that they need. You can follow the similar process to further decompose and get to the eventual solution.


function transpose(array) {
  return array[0].map(function(col, columnIdx) {
    return array.map(function(row) {
      return row[columnIdx];
    });
  });
}

function getExamAverage(scores) {
  return scores.reduce(function(total, score) {
    return total + score;
  }) / scores.length;
}

function getExamMinimum(scores) {
  return scores.reduce(function(min, score) {
    return min <= score ? min : score;
  });
}

function getExamMaximum(scores) {
  return scores.reduce(function(max, score) {
    return max >= score ? max : score;
  });
}