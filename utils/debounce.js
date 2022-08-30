export const debounce =(fn,delay=500)=>{
					let timer =null
				return function(){
					if(timer!=null){
							clearTimeout(timer)
						}
						timer = setTimeout(()=>{
							fn.call(this)
						},delay)
				}	
			}