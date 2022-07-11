import React, { useState } from "react";
import "./calculator.css";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import logo from "../../../assets/images/splash_logo.png";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";

export default function Calculator(props) {
  let { setAnchorPopperEl } = props;
  const [num, setNum] = useState(0);
  const [oldnum, setOldNum] = useState(0);
  const [operator, setOperator] = useState();

  function inputNum(e) {
    var input = e.target.value;
    if (num === 0) {
      setNum(input);
    } else {
      setNum(num + input);
    }
  }

  function clear() {
    setNum(0);
  }

  function porcentage() {
    setNum(num / 100);
  }

  function changeSign() {
    if (num > 0) {
      setNum(-num);
    } else {
      setNum(Math.abs(num));
    }
  }

  function operatorHandler(e) {
    var operatorInput = e.target.value;
    setOperator(operatorInput);
    setOldNum(num);
    setNum(0);
  }

  function calculate() {
    if (operator === "/") {
      setNum(parseFloat(oldnum) / parseFloat(num));
    } else if (operator === "X") {
      setNum(parseFloat(oldnum) * parseFloat(num));
    } else if (operator === "-") {
      console.log(oldnum);
      console.log(num);
      console.log(oldnum - num);
      setNum(parseFloat(oldnum) - parseFloat(num));
    } else if (operator === "+") {
      setNum(parseFloat(oldnum) + parseFloat(num));
    }
  }

  return (
    <div>
      <Container maxWidth="xs">
        <div className="wrapper">
          <Box
            marginTop={-2}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={logo} alt="" height={32} />
            <IconButton size="small" onClick={() => setAnchorPopperEl(null)}>
              <Close sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <h1 className="result">{num}</h1>
          <Box width="100%">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <button onClick={clear}>C</button>
              <button onClick={changeSign}>+/-</button>
              <button onClick={porcentage}>%</button>
              <button className="orange" onClick={operatorHandler} value="/">
                /
              </button>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <button className="gray" onClick={inputNum} value={7}>
                7
              </button>
              <button className="gray" onClick={inputNum} value={8}>
                8
              </button>
              <button className="gray" onClick={inputNum} value={9}>
                9
              </button>
              <button className="orange" onClick={operatorHandler} value="X">
                X
              </button>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <button className="gray" onClick={inputNum} value={4}>
                4
              </button>
              <button className="gray" onClick={inputNum} value={5}>
                5
              </button>
              <button className="gray" onClick={inputNum} value={6}>
                6
              </button>
              <button className="orange" onClick={operatorHandler} value="-">
                -
              </button>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <button className="gray" onClick={inputNum} value={1}>
                1
              </button>
              <button className="gray" onClick={inputNum} value={2}>
                2
              </button>
              <button className="gray" onClick={inputNum} value={3}>
                3
              </button>
              <button className="orange" onClick={operatorHandler} value="+">
                +
              </button>
            </Box>

            <button className="gray" onClick={inputNum} value={0}>
              0
            </button>
            <button className="gray" onClick={inputNum} value={"."}>
              ,
            </button>
            <button className="gray" style={{ visibility: "hidden" }}>
              ,
            </button>
            <button className="orange" onClick={calculate}>
              =
            </button>
          </Box>
        </div>
      </Container>
    </div>
  );
}
