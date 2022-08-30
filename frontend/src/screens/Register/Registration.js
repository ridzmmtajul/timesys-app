import React, { useState } from "react";
import { View, Layout, Title } from "react-native";
import axios from 'axios';
import {BASE_URL} from '@env';
import Form from './Form';
import tw from 'tailwind-react-native-classnames';

export default function Registration () {
  const [errorMessage, setError] = useState({name:"",email:"", password:""}),
  [successMessage, setSuccess] = useState("")

  const register = (name, email, password) => {
      axios.post(`${BASE_URL}/api/register`).then(response => {
          console.log(response.data);
      }).catch(e => {
          console.log(e.message);
      })
  }

  return (
    <Layout>
      <View style={tw`w-3/4`}>
        <Title text="Register" />
        {!!successMessage && <Text style={tw`bg-green-400 p-1 my-2 text-green-700`}>{successMessage}</Text>}
        <Form signup={true} onSubmit={register} error={errorMessage} />
      </View>
    </Layout>
  );
};