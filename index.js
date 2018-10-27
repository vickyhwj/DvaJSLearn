import React from 'react';
import dva, { connect } from 'dva';
import './style.css';

// 1. Initialize
const app = dva();

console.log(2);

// 2. Model

app.model({
  namespace: 'users',
  state:{
    title:new Date().toISOString(),
    list:[],
    max:0
  },
  reducers: {
    add  (oldState,{more:y}) { 
      let list=oldState.list;
      let max=oldState.max;
      max++;
      list.push(max);
      console.log(oldState);
      return {
        list,
        ...{
          title:new Date().toISOString()
        },
        ...{
          max:max
        }
      };
    },
    del(oldState,{payload:index}){
      let list=oldState.list;
      let newList=[];
      for(let i=0;i<list.length;++i)
        if(list[i]!=index)
          newList.push(list[i]);
      console.log(newList)
      return {
        list:newList,
        ...{title:new Date().toISOString()},
        ...{
          max:oldState.max
        }
      }
    }
  },
})


// 3. View
const App = connect(({users }) => ({
  users
}))(Users);

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#root');


function Bu({dispatch,index}){
  return <div>
    <button onClick={()=>{alert(index)}}>{index}</button>
    <button onClick={()=>{dispatch({type:'users/del',payload:index})}}>del</button>
  </div>
}

function Users({dispatch,users}) {
   
    return (
      <div>
        {
          users.list.map((item,index)=>{
            return (<Bu index={item}  dispatch={dispatch}/>)
          })
        }
        <button onClick={()=>{dispatch({type:'users/add',more:'s'})}}>add</button>
        <h1>{users.title}</h1>
      </div>
    );
  }
