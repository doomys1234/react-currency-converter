import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
// import background from "./images/bg_image.jpg"

import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.scss";
import axios from "axios";
import Header from "./components/Header/Header";
import Converter from "./components/Converter/Converter";
import Footer from "./components/Footer/Footer";
export default function App() {
  const [usdRate, setUsdRate] = useState("");
  const [eurRate, setEurRate] = useState("");
  const [firstSelectortValue, setFirstSelecortValue] = useState("");
  const [secondeSelectorValue, setSecondeSelectorValue] = useState("");
  const [firstInpValue, setFirsInptValue] = useState("");
  const [secondInpValue, setSecondInpValue] = useState("");
  const [convertResult, setConvertResult] = useState("");
  const [secondResult, setSecondResult] = useState("");


  const getValues = ({
    firstValue,
    secondValue,
    firstSelectValue,
    secondeSelectValue,
  }) => {
    setFirstSelecortValue(firstSelectValue);
    setSecondeSelectorValue(secondeSelectValue);
    setFirsInptValue(firstValue);
    setSecondInpValue(secondValue);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.fastforex.io/fetch-one?from=EUR&to=UAH&api_key=60149e3283-71a53e0715-rdtnk1"
      )
      .then((response) => setEurRate(Math.floor(response.data.result.UAH * 100)/ 100));
    axios
      .get(
        "https://api.fastforex.io/fetch-one?from=USD&to=UAH&api_key=60149e3283-71a53e0715-rdtnk1"
      )
      .then((response) => setUsdRate(Math.floor(response.data.result.UAH * 100)/ 100));
  });

  useEffect(() => {
    if (firstInpValue === "") {
      return;
    }
    axios
      .get(
        `https://api.fastforex.io/convert?from=${firstSelectortValue}&to=${secondeSelectorValue}&amount=${firstInpValue}&api_key=60149e3283-71a53e0715-rdtnk1`
      )
      .then((response) => {
        const result = response.data.result;
        const parsedResult = Object.values(result)[0];
        setConvertResult(parsedResult);
      });
  }, [
    firstInpValue,
    firstSelectortValue,
    secondeSelectorValue,
    secondInpValue,
  ]);

  useEffect(() => {
    if (secondInpValue === "") {
      return;
    }

    axios
      .get(
        `https://api.fastforex.io/convert?from=${secondeSelectorValue}&to=${firstSelectortValue}&amount=${secondInpValue}&api_key=60149e3283-71a53e0715-rdtnk1`
      )
      .then((response) => {
        const result = response.data.result;
        const parsedResult = Object.values(result)[0];
        setSecondResult(parsedResult);
        setConvertResult("");
      });
  }, [secondInpValue, firstSelectortValue, secondeSelectorValue]);

  return (
    <>
      <Header usdRate={usdRate} eurRate={eurRate} />
      <div className={s.wrapper} >
        {/* style={{ backgroundImage: `url(${background})` }} */}
      <div className={s.converter_container}>
        <Converter
          getValues={getValues}
          convertResult={convertResult}
          secondResult={secondResult}
        />
       
      </div>
        <Footer />
         </div>
       <ToastContainer
          position={"top-right"}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
     
      </>
  );
}
