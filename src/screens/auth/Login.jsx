import { SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import {
  Div,
  Button,
} from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";

import BoardingComponent from "../../component/BoardingComponent";
import LoginComponent from "../../component/LoginComponent";

import {AuthProvider, AuthContext} from '../../provider/ProviderService'

export default function LoginScreens() {
  const { SetDevice, deviceNew } = useContext(AuthContext);

  const [step, setStep] = useState(0);

  // Warna latar belakang tergantung langkah saat ini
  const backgroundColor = step === 0 ? "#f2ce9c" : step === 1 ? "#acd9d4" : "#ffffff";

  const handleNext = async () => {
    if (step < 2){ 
      setStep(step + 1);
    } 

    if(step == 1){
      console.log('now')
      await SetDevice();
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Jika deviceNew true, langsung tampilkan LoginComponent
  if (deviceNew) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <LoginComponent />
      </SafeAreaView>
    );
  }

  // Jika deviceNew false, tampilkan BoardingComponent sampai selesai
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />

      {step === 2 ? (
        <LoginComponent />
      ) : (
        <BoardingComponent
          nexts={step === 1}
          nextTombol={
            <Div row alignItems="center" gap={10}>
              {step > 0 && (
                <Button
                  mt="lg"
                  px="xl"
                  py="lg"
                  bg={step === 0 ? "#ac4700" : "#479a8b"}
                  color="white"
                  rounded="circle"
                  onPress={handleBack}
                  prefix={
                    <Div mr="lg">
                      <Icon
                        size={20}
                        name="keyboard-double-arrow-left"
                        color="white"
                      />
                    </Div>
                  }
                >
                  Back
                </Button>
              )}

              <Button
                mt="lg"
                px="xl"
                py="lg"
                bg={step === 0 ? "#ac4700" : "#479a8b"}
                color="white"
                rounded="circle"
                onPress={handleNext}
                suffix={
                  <Div ml="lg">
                    <Icon
                      size={20}
                      name="keyboard-double-arrow-right"
                      color="white"
                    />
                  </Div>
                }
              >
                Next
              </Button>
            </Div>
          }
        />
      )}
    </SafeAreaView>
  );
}
