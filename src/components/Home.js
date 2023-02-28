// type rfce and hit enter to get the below react template
import React, { useState } from 'react'
import classes from "./Home.module.css"
import Button from './Button'

function Home() {

  const [res, setRes] = useState("");

  const buttons = ["C", "9", "/", "8", "7", "6", "*", "5", "4", "3", "+", "2", "1", "0", "-", ".", "Del", "=" ];
  const operations = ["/", "*", "+", "-"];

  const findval = () => {
    // to handle initial equal condition
    if(!res) return;
    let result = Function("return "+res)();
    setRes(result.toString())
  }

  const handler = (arg) => {
    let n = res.length;
    const resArr = res.split('');

    // to handle multiple dots
    if (arg === "." && resArr[n-1] === ".") {
      return;
    }

    // to handle divide by zero exception
    if (res === "Infinity") {
      setRes("");
      return;
    }

    // to handle user entering multiple operations one after the other
    if (operations.includes(arg) && operations.includes(resArr[n-1])) {
      resArr[n-1] = arg;
      setRes(resArr.join(''));
      return;
    }

    if(arg === "C") setRes("")
    else if(arg === "=") findval()
    else if(arg === "Del") {
      if (n > 0) setRes(res.slice(0, n-1));
    }
    else {
      setRes(res.concat(arg))
    }

  }

  return (
    <div className={classes.home}>
      <div className={classes.inner}>
        <div className={classes.result}>
          <div className={classes.resbox}>
            {res}
          </div>
        </div>
        <div className={classes.btns}>
          {buttons.map((ele, idx) => {return <Button handler={handler} value={ele} key={idx}/>})}
        </div>
      </div>
    </div>
  )
}

export default Home