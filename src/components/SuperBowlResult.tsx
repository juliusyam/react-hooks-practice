import { Button, Flex, Input, Typography } from 'antd';
import { useUpdateWinnerMemo } from '../hooks';
import { useState } from 'react';
import { useUtilitiesContext } from '../contexts/UtilitiesContext';

export function SuperBowlResult({ boolArg }: { boolArg: boolean }) {

  const { afcPlayoffTeams, nfcPlayoffTeams, allPlayoffTeams,addAfcPlayoffTeam, removeAfcPlayoffTeam, replaceAfcPlayoffTeam, 
    addNfcPlayoffTeam, removeNfcPlayoffTeam, replaceNfcPlayoffTeam } = useUtilitiesContext();

  const [updateSuperBowl, setUpdateSuperBowl] = useState<boolean>(false);

  const superBowlResult = useUpdateWinnerMemo(afcPlayoffTeams, nfcPlayoffTeams, updateSuperBowl);

  const handleUpdateSuperBowl = () => {
    setUpdateSuperBowl(boolArg);
  };

  const [editValue, setEditValue] = useState<string>('');

  const [removeValue, setRemoveValue] = useState<string>('');

  return (
    <Flex gap="middle" justify="center" align="center" vertical>
      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 2 }> 
          All playoff teams:
        </Typography.Title>
        <Typography.Text> 
          {allPlayoffTeams.join(', ')}
        </Typography.Text>
      </Flex>      
      
      <Typography.Title level={ 2 }>
        {'Super Bowl Result = '}
        {superBowlResult.randomAFCTeam.teamName}: {superBowlResult.randomAFCTeam.score}
        {' v '}
        {superBowlResult.randomNFCTeam.teamName}: {superBowlResult.randomNFCTeam.score}
      </Typography.Title>
      <Flex gap="middle" justify="center" align="center" vertical>
        <Button onClick={handleUpdateSuperBowl} type="primary">
          Update Super Bowl Result
        </Button>
      </Flex>

      <Flex gap="middle" justify="center" align="center">
        <Input size="small" showCount value={ editValue } onChange={ e => setEditValue(e.target.value) } />
        <Button onClick={ () => addAfcPlayoffTeam(editValue) } type="primary" disabled={ editValue.length <= 0 }>
          Add AFC Team
        </Button>
        <Button onClick={ () => addNfcPlayoffTeam(editValue) } type="primary" disabled={ editValue.length <= 0 }>
          Add NFC Team
        </Button>
        <Button onClick={ () => removeAfcPlayoffTeam(editValue) } type="primary" disabled={ editValue.length <= 0 }>
          Remove AFC Team
        </Button>
        <Button onClick={ () => removeNfcPlayoffTeam(editValue) } type="primary" disabled={ editValue.length <= 0 }>
          Remove NFC Team
        </Button>
      </Flex>

      <Flex gap="middle" justify="center" align="center">
        <Input size="small" showCount value={ removeValue } onChange={ e => setRemoveValue(e.target.value) } />
        <Button onClick={ () => replaceAfcPlayoffTeam(editValue, removeValue) } type="primary" disabled={ removeValue.length <= 0 }>
          Replace AFC Team
        </Button>
        <Button onClick={ () => replaceNfcPlayoffTeam(editValue, removeValue) } type="primary" disabled={ removeValue.length <= 0 }>
          Replace NFC Team
        </Button>
      </Flex>

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title>AFC Playoff Teams</Typography.Title>
      </Flex>

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 3 }>Click on teams to remove them</Typography.Title>
      </Flex>

      <Flex style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        {afcPlayoffTeams.map((team, index) => (
          <Button onClick={ () => removeAfcPlayoffTeam(team) } key={index}>{team} </Button>
        ))}
      </Flex>

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title>NFC Playoff Teams</Typography.Title>
      </Flex>

      <Flex gap="middle" justify="center" align="center" vertical>
        <Typography.Title level={ 3 }>Click on teams to remove them</Typography.Title>
      </Flex>

      <Flex style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        {nfcPlayoffTeams.map((team, index) => (
          <Button onClick={ () => removeNfcPlayoffTeam(team) } key={index}>{team}</Button>
        ))}
      </Flex>
    </Flex>
  )
}
