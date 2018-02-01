import sortBy from 'sort-by'

export const loadLastViewed = () => {
	try {
		const serializedArray = localStorage.getItem('lastviewed')
    console.log(serializedArray)
		if (serializedArray === null) {
			return undefined
		}
		return JSON.parse(serializedArray)
	} catch (error) {
		return undefined
	}
}

export const saveLastViewed = updatedLastviewed => {
  const last15 = updatedLastviewed
  .sort(sortBy('-dateTime'))
  .slice(0, 14)

	try {
		const serializedArray = JSON.stringify(last15)
    console.log('serialized for local storage: ', serializedArray)
		localStorage.setItem('lastviewed', serializedArray)
	} catch (error) {
		// ignore for now
	}
}


export const clearLastViewedStorage = () => {
  localStorage.removeItem('lastviewed')
}
