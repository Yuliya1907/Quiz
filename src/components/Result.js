import React, { useEffect } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/questionReducer';
import { resetResultAction } from '../redux/resultReducer';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

export default function Result() {
    const dispatch = useDispatch();
    const { questions: { queue, answers}, result : {result, userId}} = useSelector(state => state);

    useEffect(() => {
        console.log(result)
    })

    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);


    function onRestart() {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
    return(
        <div className='container'> 
             <h1 className='title text-light'>Quiz Application</h1>

             <div className='result flex-center'>
             <div className='flex'>
                <span>Username</span>
                <span className='bold'>Daily Tuition</span>
             </div>
             <div className='flex'>
                <span>Total quiz points</span>
                <span className='bold'>{totalPoints || 0}</span>
             </div>
             <div className='flex'>
                <span>Total questions</span>
                <span className='bold'>{queue.length || 0}</span>
             </div>
             <div className='flex'>
                <span>Total attempts</span>
                <span className='bold'>{attempts || 0}</span>
             </div>
             <div className='flex'>
                <span>Total earn points</span>
                <span className='bold'>{earnPoints || 0}</span>
             </div>
             <div className='flex'>
                <span>Quiz result</span>
                <span style={{color : `${flag ? "#2aff95" : "#ff2a66"}`}} className='bold'>{flag ? 'Passed' : 'Failed'}</span>
             </div>
             </div>

             <div className='start'>
                <Link className='btn' to={'/'} onClick={onRestart}>Return to main page</Link>
             </div>

             <div className='container'>
                <ResultTable />
             </div>
             
        </div>
    )
}