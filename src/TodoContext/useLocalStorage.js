import React from "react";

function useLocalStorage(itemName, initalValue){

    const [loading,setLoading] = React.useState(true);
    const [error,setError] = React.useState(false);
  
    const [item,setItem] = React.useState(initalValue);
  
    React.useEffect(()=>{
      setTimeout(()=> {
        try {        
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
        
          if(!localStorageItem){
            localStorage.setItem(itemName,JSON.stringify([initalValue]));
            parsedItem=[initalValue];
          }else{
            parsedItem = JSON.parse(localStorageItem);
          }
      
          setItem(parsedItem);
          setLoading(false);
        } catch (error) {
          setError(error);
        }
      }, 10000);
  
    });
  
  
    
  
    const saveItem = (newItem) => {
      try {      
        const stringifieldItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifieldItem);
        setItem(newItem);
      } catch (error) {
        setError(error);
      }
    };
  
    return {
      item,
      saveItem,
      loading,
      error,
    };
  }

  export {useLocalStorage}