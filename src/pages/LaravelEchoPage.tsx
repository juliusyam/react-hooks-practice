import { useState } from 'react';
import { UserResponse } from '../models/apiModel.ts';
import { Button, Divider, Flex, Input, Typography } from 'antd';
import { axiosInstance } from '../utilities';
import { AxiosResponse } from 'axios';
import { useEcho } from '../hooks/echo.ts';

export function LaravelEchoPage() {

  const [loginPayload, setLoginPayload] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null);

  const login = async () => {
    setLoading(true);

    const response: AxiosResponse<UserResponse> = await axiosInstance.post('/login', loginPayload)
      .finally(() => setLoading(false));

    setUserResponse(response.data);
  }

  const { newFlightEvent, updatedFlightEvent, deletedFlightEvent, newPrivateFlightEvent, updatedPrivateFlightEvent, deletedPrivateFlightEvent } = useEcho(userResponse);

  return (
    <div>
      <Typography.Title level={ 2 }>Login</Typography.Title>
      {
        userResponse ?
          <Flex gap={ 3 } vertical>
            <Typography.Title level={ 4 } style={ { margin: 0 } }>{ userResponse.user.name }</Typography.Title>
            <Typography.Title level={ 5 } style={ { margin: 0 } }>{ userResponse.user.email }</Typography.Title>
          </Flex> :
          <Flex gap={ 10 }>
            <Input
              placeholder="Email"
              type="email"
              size="small"
              value={ loginPayload.email }
              onChange={ e => {
                setLoginPayload(prevState => ({ ...prevState, email: e.target.value }))
              } }
            />
            <Input
              placeholder="Password"
              type="password"
              size="small"
              value={ loginPayload.password }
              onChange={ e => {
                setLoginPayload(prevState => ({ ...prevState, password: e.target.value }))
              } }
            />
            <Button
              onClick={ login }
              loading={ loading }
              disabled={ loginPayload.email.trim().length <= 0 || loginPayload.password.trim().length <= 0 }>
              Login
            </Button>
          </Flex>
      }

      <Divider />

      <Typography.Title level={ 2 }>Latest Flight Events (Public)</Typography.Title>

      { newFlightEvent && !updatedFlightEvent && !deletedFlightEvent && (
        <div>
          <Typography.Title level={ 4 }>New Flight</Typography.Title>
          <p>New flight added, flight number { newFlightEvent.flight_number }, id = { newFlightEvent.id }</p>
        </div>
      ) }

      <br/>

      { updatedFlightEvent && !newFlightEvent && !deletedFlightEvent && (
        <div>
          <Typography.Title level={ 4 }>Updated Flight</Typography.Title>
          <p>Flight updated, flight number { updatedFlightEvent.flight_number }, id = { updatedFlightEvent.id }</p>
        </div>
      ) }

      <br/>

      { deletedFlightEvent && !newFlightEvent && !updatedFlightEvent && (
        <div>
          <Typography.Title level={ 4 }>Deleted Flight</Typography.Title>
          <p>Flight deleted, flight id = { deletedFlightEvent.id }</p>
        </div>
      ) }

      <Divider />

      <Typography.Title level={ 2 }>Latest Flight Events (Private)</Typography.Title>

      { newPrivateFlightEvent && !updatedPrivateFlightEvent && !deletedPrivateFlightEvent && (
        <div>
          <Typography.Title level={ 4 }>New Flight</Typography.Title>
          <p>New flight added, flight number { newPrivateFlightEvent.flight_number }, id = { newPrivateFlightEvent.id }</p>
        </div>
      ) }

      <br/>

      { updatedPrivateFlightEvent && !newPrivateFlightEvent && !deletedPrivateFlightEvent && (
        <div>
          <Typography.Title level={ 4 }>Updated Flight</Typography.Title>
          <p>Flight updated, flight number { updatedPrivateFlightEvent.flight_number }, id = { updatedPrivateFlightEvent.id }</p>
        </div>
      ) }

      <br/>

      { deletedPrivateFlightEvent && !newPrivateFlightEvent && !updatedPrivateFlightEvent && (
        <div>
          <Typography.Title level={ 4 }>Deleted Flight</Typography.Title>
          <p>Flight deleted, flight number { deletedPrivateFlightEvent.flight_number }, id = { deletedPrivateFlightEvent.id }</p>
        </div>
      ) }
    </div>
  )
}
