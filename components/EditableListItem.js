import { useState } from 'react';
import { Flex, Text, Box, Button, FormControl, Input, Select, FormLabel } from '@chakra-ui/react';
import { updateUser } from '@/utils/db';

export default function EditableListItem({ heading, detail, type, formDetails }) {
  const [isEditable, setEditable] = useState(false);

  const handleClick = () => {
    setEditable(!isEditable);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstname, surname, gender } = e.target.elements;
    const name = null || firstname.value + ' ' + surname.value;
    const userGender = gender.value || null;

    updateUser(data);
    setEditable(false);
  };
  return (
    <Flex
      w='100%'
      maxW='500px'
      justify='space-between'
      py={4}
      borderBottom='1px solid'
      borderBottomColor='#ebebeb'
    >
      <Flex direction='column'>
        <Text fontSize='md' fontWeight='bold'>
          {heading}
        </Text>
        <Text fontSize='md'>{detail}</Text>
        {isEditable && (
          <FormControl as='form' mt={4} onSubmit={handleSubmit}>
            {type === 'input' && (
              <Flex>
                {formDetails.map((detail, index) => {
                  return (
                    <Flex direction='column' key={index}>
                      <FormLabel
                        p={0}
                        m={0}
                        fontSize='12px'
                        id={`${detail}-label`}
                        forhtml={detail}
                      >
                        {detail}
                      </FormLabel>
                      <Input placeholder={detail} id={detail} />
                    </Flex>
                  );
                })}
              </Flex>
            )}
            {type === 'dropdown' && (
              <Select id={heading}>
                {formDetails.map((detail, index) => {
                  return (
                    <option key={index} value={detail}>
                      {detail}
                    </option>
                  );
                })}
              </Select>
            )}
            <Button type='submit' bg='brand.100' mt={4} color='white'>
              Save
            </Button>
          </FormControl>
        )}
      </Flex>
      <Button variant='ghost' color={isEditable ? 'red' : 'brand.100'} onClick={handleClick}>
        {isEditable ? 'Cancel' : 'Edit'}
      </Button>
    </Flex>
  );
}
