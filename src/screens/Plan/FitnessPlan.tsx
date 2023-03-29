import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import Beginner from "../Plan/Level/Beginner";
import Intermidiate from "../Plan/Level/Intermidiate";
import Advanced from "../Plan/Level/Advanced";

import { db } from "../../../Firebase.config";
import { collection, onSnapshot, query } from "firebase/firestore";

const FitnessPlan = ({ navigation }: any) => {
  const handlePress = () => {
    navigation.navigate("BeginnerPlan");
    console.log("handlePress");
  };
  const handleSubscription = () => {
    navigation.navigate("Subscription");
  };

  return (
    <View style={tw`flex justify-start items-start flex-1 bg-[#FF1D38]`}>
      <View style={tw`flex justify-start`}>
        <View style={tw`h-20`}>
          {/* Logo */}
          <View style={tw`flex flex-row justify-start items-center py-2 px-4`}>
            <View style={tw``}>
              <Image
                source={require("../../../assets/Image2.png")}
                style={tw`w-10 h-10 `}
              />
            </View>
            <View style={tw`px-1`}>
              <View style={tw`flex flex-row`}>
                <Text style={tw`text-[#000000] text-[20px] font-extrabold`}>
                  INSTA
                </Text>
                <Text style={tw`text-[#FFFFFF] text-[20px] font-extrabold`}>
                  FIT
                </Text>
              </View>

              <Text style={tw`text-[#000000] text-[10px]`}>BE MORE FIT</Text>
            </View>
          </View>
        </View>
        {/*  */}
        <View style={tw`h-[50px] `}>
          <View style={tw`flex flex-row justify-evenly items-center w-full `}>
            <View style={tw`flex items-center`}>
              <Text style={tw`text-[#ffffff]`}>0</Text>
              <Text style={tw`text-[#ffffff]`}>GOAL</Text>
            </View>
            <Text style={tw`text-[#ffffff]`}>-</Text>
            <View style={tw`flex items-center`}>
              <Text style={tw`text-[#ffffff]`}>0</Text>
              <Text style={tw`text-[#ffffff]`}>FOOD</Text>
            </View>
            <Text style={tw`text-[#ffffff]`}>+</Text>
            <View style={tw`flex items-center`}>
              <Text style={tw`text-[#ffffff]`}>0</Text>
              <Text style={tw`text-[#ffffff]`}>WORKOUT</Text>
            </View>
            <Text style={tw`text-[#ffffff]`}>=</Text>
            <View style={tw`flex items-center`}>
              <Text style={tw`text-[#ffffff]`}>0</Text>
              <Text style={tw`text-[#ffffff]`}>REMAINING</Text>
            </View>
          </View>
        </View>
      </View>
      {/*  */}
      <View
        style={tw`flex items-center w-full h-full bg-[#ffffff] rounded-[30px]`}
      >
        <TouchableOpacity onPress={handlePress} style={tw`py-4`}>
          <Beginner />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubscription} style={tw`py-4`}>
          <Intermidiate />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubscription} style={tw`py-4`}>
          <Advanced />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FitnessPlan;