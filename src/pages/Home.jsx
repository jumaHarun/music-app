import React, {useState , useEffect} from 'react'
//import axios from "axios"
const Home = () => {

	const[endPoint, setEndPoint] = useState('')

	const[container, setContainer] = useState()

	const[isFetching, setIsFetching] = useState(false)

	useEffect(()=>{
		console.log('Fetching');
		fetchMe(endPoint)
	},[isFetching])
	
const fetchMe = (endPoint ) =>{
  fetch(`https://shazam.p.rapidapi.com/search?term=${endPoint}&locale=en-US&offset=0&limit=5`,{

	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '84c519c945msh92ea5d88a1ca5ecp19d27cjsn54d7ea5f78f0',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
})
.then(response=>{
	//console.log(response);
	return(response.json());
	
})
.then(data=>{
	 setContainer(data);
	console.log(data.artists.hits[0].artist.name);
})

.catch(error=>{
	console.log(error);
})

} 


   
const onChangeHandler = (e) =>{
	setEndPoint(e.target.value)
}

const submitHandler = (e) =>{
     e.preventDefault()
    setIsFetching(!isFetching)
}
  return (
   <div className='Home'>
	<form onSubmit={submitHandler}>
		<input type="text" value={endPoint} onChange={onChangeHandler} />
		<button type='submit'> submit</button>
	</form>
	{container?.artists.hits.map((item)=>{
		<div>
			<p>{item.artist.name}</p>
		</div>
	})}
   </div>git branch
        
   
  )
}

export default Home