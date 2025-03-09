import React from 'react'
import Stage1 from "./stage1";
import Stage2 from "./stage2"
import Stage3 from "./stage3"
import Stage4 from "./stage4"
import Stage5 from "./stage5"
import {useStage} from "../context/SetStageContext"
import Preview from './Preview';
import { useNavigate } from "react-router-dom";
import Loader from './Loader';
import { useEffect,useState } from 'react';

const PropertyForm = () => {
  const { stage, setStage } = useStage();
   const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
    useEffect(() => {
       if (!sessionStorage.getItem("isLoggedIn")) {
         navigate("/login");
       } else {
         setTimeout(() => setLoading(false), 2000);
       }
     }, [navigate]);


     if (loading) {
      return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
          <Loader />
        </div>
      );
    }

  return (
    <>
      {stage === 1 ? (
        <Stage1/>
      ) : stage ==2 ? (
          <Stage2/>
      ) :stage ==3 ?(
        <Stage3/>
      ):stage == 4 ?(
          <Stage4/>
       ): stage == 5 ?(
        <Stage5/>
      ):stage == 6 ?(
        <Preview/>
      ):(
        <></>
      )
      }
      </>
   
  );
};

export default PropertyForm;

