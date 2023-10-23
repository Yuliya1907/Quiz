import React, { useEffect, useState } from 'react';
import Questions from './Questions';
import { useSelector, useDispatch } from 'react-redux';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions';
import { PushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom';

export default function Quiz() {
   const [check, setChecked] = useState(undefined);
   const { queue, trace } = useSelector(state => state.questions);
   const state = useSelector(state => state)
   const result = useSelector(state => state.result.result)
   const dispatch = useDispatch();

   useEffect(() => {
      console.log(state);
   })
   
   function onPrev(){
      if (trace > 0) {
         dispatch(MovePrevQuestion());
      }
      
   }
   
   function onNext(){
      if (trace < queue.length){
         dispatch(MoveNextQuestion());

         if(result.length <= trace) {
            dispatch(PushAnswer(check))
         }
       
      }
   }

   function onChecked(check) {
      setChecked(check)
   }

   if (result.length && result.length >= queue.length) {
      return <Navigate to={'/result'} replace={true}></Navigate>
   }
   
   return(
    <div className='container'>
      <h1 className='title text-light'>
        Quiz application
      </h1>
      <Questions onChecked={onChecked}/>
      <div className='grid'>
         {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
         <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
   ) 
}