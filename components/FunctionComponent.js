import { normalizeUnits } from 'moment-timezone'

export function myfun_weekdayToJapanese(weekday) {
  if (weekday == 'MON') {
    weekday = '月'
  }
  if (weekday == 'TUE') {
    weekday = '火'
  }
  if (weekday == 'WED') {
    weekday = '水'
  }
  if (weekday == 'THUR') {
    weekday = '木'
  }
  if (weekday == 'FRI') {
    weekday = '金'
  }
  if (weekday == 'SAT') {
    weekday = '土'
  }
  if (weekday == 'SUN') {
    weekday = '日'
  }

  return weekday
}

export function myfun_getdayofweek(date) {
  const d = new Date(date)
  //get day of week
  const weekday = new Array(7)
  weekday[0] = '日'
  weekday[1] = '月'
  weekday[2] = '火'
  weekday[3] = '水'
  weekday[4] = '木'
  weekday[5] = '金'
  weekday[6] = '土'
  var dayofweek = weekday[d.getDay()]
  return dayofweek
}

export function myfun_getdayofweekEng(date) {
  const d = new Date(date)
  //get day of week
  const weekday = new Array(7)
  weekday[0] = 'SUN'
  weekday[1] = 'MON'
  weekday[2] = 'TUE'
  weekday[3] = 'WED'
  weekday[4] = 'THUR'
  weekday[5] = 'FRI'
  weekday[6] = 'SAT'
  var dayofweek = weekday[d.getDay()]
  return dayofweek
}

export function myfun_myRegDate() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1 // 0~11まで 0が1月になる
  // var yobi = date.getDay() //曜日 0日曜日~6土曜日
  // var time = date.getTime()
  var day = date.getDate() //날짜 1~31
  var myDate = year + '-' + month + '-' + day

  return myDate
}

export function myfun_myRegTime() {
  var time = new Date()

  var h = time.getHours()
  var m = time.getMinutes()
  var s = time.getSeconds()
  var myTime = h + ':' + m + ':' + s

  return myTime
}

export function myfun_getMyDate(date) {
  var Y = date.getFullYear()
  var M = date.getMonth() + 1
  var D = date.getDate()

  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  var ModifiedDate = Y + '-' + M + '-' + D

  return ModifiedDate
}

export function myfun_getLessonPage_BEFORE_BACKUP(course, courseName) {
  if (course == 'OUTPUT COURSE') {
    if (courseName == 'CourseDI') {
      var pageName = 'discussion'
    } else if (courseName == 'CourseST') {
      var pageName = 'showandtell'
    } else if (courseName == 'CourseDB') {
      var pageName = 'debating'
    }
  } else if (course == 'INPUT COURSE') {
    if (courseName == 'CourseA') {
      var pageName = 'readinga'
    } else if (courseName == 'CourseB') {
      var pageName = 'readingb'
    } else if (courseName == 'CourseZ') {
      var pageName = 'readingz'
    } else if (courseName == 'CourseAN') {
      var pageName = 'readinga'
    } else if (courseName == 'CourseBN') {
      var pageName = 'readingb'
    } else if (courseName == 'CourseZN') {
      var pageName = 'readingz'
    }
  } else if (course == 'SUPPORT COURSE') {
    if (courseName == 'CourseEK') {
      var pageName = 'eikensupport'
    } else if (courseName == 'CourseGR') {
      var pageName = 'grammarsupport'
    } else if (courseName == 'CourseSE') {
      var pageName = 'schoolengsupport'
    }
  } else if (course == 'EXTRA INPUT COURSE') {
    if (courseName == 'CourseMW') {
      var pageName = 'extrainputmw'
    }
  }
  return pageName
}
export function myfun_getLessonPage(course, courseName) {
  if (course == 'OUTPUT COURSE') {
    if (courseName == 'CourseDI') {
      var pageName = 'discussion'
    } else if (courseName == 'CourseST') {
      var pageName = 'showandtell'
    } else if (courseName == 'CourseDB') {
      var pageName = 'debating'
    }
  } else if (course == 'INPUT COURSE') {
    var pageName = 'reading'
    // if (courseName == 'CourseA') {
    //   var pageName = 'reading'
    // } else if (courseName == 'CourseB') {
    //   var pageName = 'reading'
    // } else if (courseName == 'CourseZ') {
    //   var pageName = 'reading'
    // } else if (courseName == 'CourseAN') {
    //   var pageName = 'reading'
    // } else if (courseName == 'CourseBN') {
    //   var pageName = 'reading'
    // } else if (courseName == 'CourseZN') {
    //   var pageName = 'reading'
    // }
  } else if (course == 'SUPPORT COURSE') {
    var pageName = 'reading'
    // if (courseName == 'CourseGR') {
    //   var pageName = 'grammarsupport'
    // } else if (courseName == 'CourseSE') {
    //   var pageName = 'schoolengsupport'
    // }else if (courseName == 'CourseVR') {
    //   var pageName = 'schoolengsupport'
    // }
  } else if (course == 'TEST COURSE') {
    var pageName = 'reading'
    // if (courseName == 'CourseEK') {
    //   var pageName = 'eikentest'
    // }else if (courseName == 'CourseTFL') {
    //   var pageName = 'toefltest'
    // }else if (courseName == 'CourseTOE') {
    //   var pageName = 'toeictest'
    // }else if (courseName == 'CourseIEL') {
    //   var pageName = 'ieltstest'
    // }else if (courseName == 'CourseSAT') {
    //   var pageName = 'sattest'
    // }else if (courseName == 'CourseSSAT') {
    //   var pageName = 'ssattest'
    // }
  }
  return pageName
}

export function myfun_getLessonPageMoreDetail(course, courseName, st_type) {
  if (course == 'OUTPUT COURSE') {
    if (courseName == 'CourseDI') {
      var pageName = 'discussion'
    } else if (courseName == 'CourseST') {
      if (st_type == 'test type') {
        var pageName = 'showandtellTestType'
      } else {
        var pageName = 'showandtell'
      }
    } else if (courseName == 'CourseDB') {
      var pageName = 'debating'
    }
  } else if (course == 'INPUT COURSE') {
    // var pageName = 'reading'
    if (courseName == 'CourseA') {
      var pageName = 'reading'
    } else if (courseName == 'CourseB') {
      var pageName = 'reading'
    } else if (courseName == 'CourseZ') {
      var pageName = 'reading'
    } else if (courseName == 'CourseAN') {
      var pageName = 'reading'
    } else if (courseName == 'CourseBN') {
      var pageName = 'reading'
    } else if (courseName == 'CourseZN') {
      var pageName = 'reading'
    } else if (courseName == 'Course1MIN') {
      var pageName = 'oneminspk'
    }
  } else if (course == 'SUPPORT COURSE') {
    var pageName = 'reading'
    // if (courseName == 'CourseGR') {
    //   var pageName = 'grammarsupport'
    // } else if (courseName == 'CourseSE') {
    //   var pageName = 'schoolengsupport'
    // }else if (courseName == 'CourseVR') {
    //   var pageName = 'schoolengsupport'
    // }
  } else if (course == 'TEST COURSE') {
    var pageName = 'reading'
    // if (courseName == 'CourseEK') {
    //   var pageName = 'eikentest'
    // }else if (courseName == 'CourseTFL') {
    //   var pageName = 'toefltest'
    // }else if (courseName == 'CourseTOE') {
    //   var pageName = 'toeictest'
    // }else if (courseName == 'CourseIEL') {
    //   var pageName = 'ieltstest'
    // }else if (courseName == 'CourseSAT') {
    //   var pageName = 'sattest'
    // }else if (courseName == 'CourseSSAT') {
    //   var pageName = 'ssattest'
    // }
  }
  return pageName
}

export function myFun_getYoutubeID(youtubeURL) {
  //https://youtu.be/dqONk48l5vY
  var splitString = youtubeURL.split('/')
  var youTubeId = splitString[3]
  return youTubeId
}

export function myFun_addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

//special character delete
export function myFun_replaceSpecialChar(original, toThis) {
  var conLower = original.toLowerCase()
  var repContents = conLower.replace(/[\W_]/g, toThis)
  repContents = repContents.replace('   ', toThis)
  repContents = repContents.replace('  ', toThis)

  return repContents
}

//重複を削除＋ abc順でsort
export function myFun_noDuplicateInArray(arrayData) {
  var b = arrayData
    .sort((a, b) => a.localeCompare(b))
    .filter(function (x, i, self) {
      return self.indexOf(x) === i
    })
  return b
}

export function myFun_vocaFormJapanese(form) {
  var form_Japanese
  var form_Korean
  var form_Chinese

  if (form == 'noun') {
    form_Japanese = '名詞'
    form_Korean = '명사'
    form_Chinese = ''
  }
  if (form == 'verb') {
    form_Japanese = '動詞'
    form_Korean = '동사'
    form_Chinese = ''
  }
  if (form == 'pronoun') {
    form_Japanese = '代名詞'
    form_Korean = '대명사'
    form_Chinese = ''
  }
  if (form == 'preposition') {
    form_Japanese = '前置詞'
    form_Korean = '전치사'
    form_Chinese = ''
  }
  if (form == 'conjunction') {
    form_Japanese = '接続詞'
    form_Korean = '접속사'
    form_Chinese = ''
  }
  if (form == 'interjection') {
    form_Japanese = '間投詞'
    form_Korean = '감탄사'
    form_Chinese = ''
  }
  if (form == 'adjective') {
    form_Japanese = '形容詞'
    form_Korean = '형용사'
    form_Chinese = ''
  }
  if (form == 'adverb') {
    form_Japanese = '副詞'
    form_Korean = '부사'
    form_Chinese = ''
  }
  if (form == 'superlative') {
    form_Japanese = '最上級'
    form_Korean = '최상급'
    form_Chinese = ''
  }
  if (form == 'collocation') {
    form_Japanese = 'abbreviation'
    form_Korean = 'コロケーション'
    form_Chinese = ''
  }
  if (form == 'article') {
    form_Japanese = '冠詞'
    form_Korean = '관사'
    form_Chinese = ''
  }
  if (form == 'auxiliary verb') {
    form_Japanese = '助動詞'
    form_Korean = '조동사'
    form_Chinese = ''
  }
  if (form == 'interrogative') {
    form_Japanese = '疑問詞'
    form_Korean = '의문문'
    form_Chinese = ''
  }
  if (form == 'relative') {
    form_Japanese = '関係詞'
    form_Korean = '관계사'
    form_Chinese = ''
  }
  if (form == 'idiom') {
    form_Japanese = '熟語'
    form_Korean = '숙어'
    form_Chinese = ''
  }
  return form_Japanese
}

export function myFun_vocaFormKorean(form) {
  var form_Japanese
  var form_Korean
  var form_Chinese

  if (form == 'noun') {
    form_Japanese = '名詞'
    form_Korean = '명사'
    form_Chinese = ''
  }
  if (form == 'verb') {
    form_Japanese = '動詞'
    form_Korean = '동사'
    form_Chinese = ''
  }
  if (form == 'pronoun') {
    form_Japanese = '代名詞'
    form_Korean = '대명사'
    form_Chinese = ''
  }
  if (form == 'preposition') {
    form_Japanese = '前置詞'
    form_Korean = '전치사'
    form_Chinese = ''
  }
  if (form == 'conjunction') {
    form_Japanese = '接続詞'
    form_Korean = '접속사'
    form_Chinese = ''
  }
  if (form == 'interjection') {
    form_Japanese = '間投詞'
    form_Korean = '감탄사'
    form_Chinese = ''
  }
  if (form == 'adjective') {
    form_Japanese = '形容詞'
    form_Korean = '형용사'
    form_Chinese = ''
  }
  if (form == 'adverb') {
    form_Japanese = '副詞'
    form_Korean = '부사'
    form_Chinese = ''
  }
  if (form == 'superlative') {
    form_Japanese = '最上級'
    form_Korean = '최상급'
    form_Chinese = ''
  }
  if (form == 'collocation') {
    form_Japanese = 'abbreviation'
    form_Korean = 'コロケーション'
    form_Chinese = ''
  }
  if (form == 'article') {
    form_Japanese = '冠詞'
    form_Korean = '관사'
    form_Chinese = ''
  }
  if (form == 'auxiliary verb') {
    form_Japanese = '助動詞'
    form_Korean = '조동사'
    form_Chinese = ''
  }
  if (form == 'interrogative') {
    form_Japanese = '疑問詞'
    form_Korean = '의문문'
    form_Chinese = ''
  }
  if (form == 'relative') {
    form_Japanese = '関係詞'
    form_Korean = '관계사'
    form_Chinese = ''
  }
  if (form == 'idiom') {
    form_Japanese = '熟語'
    form_Korean = '숙어'
    form_Chinese = ''
  }
  return form_Korean
}
