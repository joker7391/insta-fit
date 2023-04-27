import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
} from "react-native";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import AuthContext, {
  useAuthContext,
} from "../../component/AuthContext/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase.config";
import { useNavigation } from "@react-navigation/native";

const Pay = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getUser } = useAuthContext;
  const { data } = route.params;
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentTermsModalVisible, setPaymentTermsModalVisible] =
    useState(false);
  const [paymentAmount, setPaymentAmount] = useState(data.price);

  console.log("pay", data);
  console.log("Account", getUser);

  const RadioButton = ({ isSelected }) => (
    <View
      style={[
        tw`w-5 h-5 border border-gray-400 rounded-full justify-center items-center`,
        isSelected && tw`border-blue-500`,
      ]}
    >
      {isSelected && <View style={tw`w-3 h-3 bg-blue-500 rounded-full`} />}
    </View>
  );

  const PaymentOption = ({ source, value }) => (
    <TouchableOpacity
      style={tw`bg-[#ffffff] w-full p-3 shadow-md rounded-full flex flex-row justify-between items-center`}
      onPress={() => setSelectedPayment(value)}
    >
      <Image source={source} />
      <RadioButton isSelected={selectedPayment === value} />
    </TouchableOpacity>
  );

  const handleNext = () => {
    if (selectedPayment) {
      setPaymentTermsModalVisible(true);
    }
  };

  const subscriptionCollectionRef = collection(db, "subscriptions");

  const handleSubmit = () => {
    const paymentDetails = {
      subscription_type: data.value,
      payment_type: selectedPayment,
      amount: paymentAmount,
      user: "danielaco3091@gmail.com",
    };
    addDoc(subscriptionCollectionRef, paymentDetails);
    navigation.navigate("TransactionComplete");
  };

  const selectedPaymentLogo =
    selectedPayment === "gcash"
      ? require("../../../assets/Gcash.png")
      : require("../../../assets/Image5.png");

  return (
    <View style={tw`flex-1`}>
      <View style={tw`p-3 bg-[#ffffff] shadow-lg flex flex-row items-center`}>
        <Image source={require("../../../assets/Vector11.png")} />
        <Text style={tw`text-center px-25 font-bold text-17px`}>
          Payment Method
        </Text>
      </View>
      <View style={tw`flex items-start py-5 px-5`}>
        <View>
          <Text style={tw`font-bold text-[17px] px-2`}>
            Select your payment method
          </Text>
        </View>
        <View style={tw`w-full gap-3 py-5 `}>
          <PaymentOption
            source={require("../../../assets/Gcash.png")}
            value="gcash"
          />
          <PaymentOption
            source={require("../../../assets/Image5.png")}
            value="paymaya"
          />
        </View>
      </View>

      <View style={tw`absolute bottom-3 w-full px-6`}>
        <TouchableOpacity
          onPress={handleNext}
          style={tw`bg-[#FAA0A0] px-4 py-2 rounded-full`}
        >
          <Text style={tw`text-center text-[#ffffff] text-18px font-bold`}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentTermsModalVisible}
      >
        <View style={tw`flex-1 bg-black opacity-90`}>
          <View style={tw` bg-[#ffffff] absolute bottom-0 right-0 left-0`}>
            <SafeAreaView style={tw`bg-[#ffffff]`}>
              <TouchableOpacity
                animationType="slide"
                style={tw`items-center rounded-full p-2 m-4`}
                onPress={() => setPaymentTermsModalVisible(false)}
              >
                <Image source={require("../../../assets/Frame33.png")} />
              </TouchableOpacity>
              <View style={tw`p-5`}>
                <View
                  style={tw`bg-[#DFE7F5] flex flex-row justify-between items-center p-2 `}
                >
                  <Text>
                    {" "}
                    {selectedPayment === "gcash" ? "GCash" : "PayMaya"}
                  </Text>
                  <Image source={selectedPaymentLogo} />
                </View>

                <TextInput
                  style={tw`border border-gray-300 p-2 mt-5 rounded`}
                  onChangeText={setPaymentAmount}
                  value={paymentAmount}
                  keyboardType="numeric"
                  placeholder="Enter payment amount"
                />
                <TouchableOpacity
                  style={tw`bg-blue-500 rounded-full p-2 m-4`}
                  onPress={() => handleSubmit()}
                >
                  <Text style={tw`text-white text-center`}>Submit</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Pay;