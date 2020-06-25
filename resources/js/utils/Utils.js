import * as _ from 'lodash'

class Utils {

  static normalize (list, key = 'id') {
    let result = {}

    for (let item of list) {
      result[item[key]] = item
    }
    return result
  }

  static denormalize (normalizedList) {
    let result = []
    for (var currentItem in normalizedList) {
      result.push(
        normalizedList[currentItem]
      )
    }
    return result
  }

  static prefixObjectStringsWithValue (obj, modulePrefix) {
    Object.keys(obj).forEach(function (key) {
      if (typeof obj[key] === 'object') {
        return Utils.prefixObjectStringsWithValue(obj[key], modulePrefix)
      }
      obj[key] = modulePrefix + obj[key]
    })
  }

  static extractTextFromHTML (html) {
    var span = document.createElement('span')
    span.innerHTML = html
    return span.textContent || span.innerText
  }

  static firstItemInArray (array) {
    if (!array) return null
    return array[0] || null
  }

  static makeArray (data) {
    let result = data

    if (!Array.isArray(data)) {
      result = [data]
    }
    return result
  }

  static getItemKeyFromlist (list, key) {
    let resultIDSList = []
    for (let currentItem of list) {
      const itemChildIDS = this.makeArray(_.get(currentItem, key, []))
      resultIDSList = _.union(resultIDSList, itemChildIDS)
    }
    return resultIDSList
  }

  static putChildIntoList (summaryList, detailedList, sourceKey, destinationKey) {
    detailedList = this.makeArray(detailedList)
    const fetchedDictionary = this.normalize(detailedList)
    for (let currentItem of summaryList) {
      let currentItemSourceIdsList = this.makeArray(currentItem[sourceKey])
      let transformedItem = []
      for (let currentItemSourceId of currentItemSourceIdsList) {
        transformedItem.push(fetchedDictionary[currentItemSourceId])
      }
      currentItem[destinationKey] = !Array.isArray(currentItem[sourceKey]) ? _.head(transformedItem) : transformedItem
    }
    return summaryList
  }


  // static makeObject(arr){
  //     let rv = {};
  //     for (var i = 0; i < arr.length; ++i)
  //       rv[i] = arr[i];
  //     return rv;
  //   }

}

export default Utils