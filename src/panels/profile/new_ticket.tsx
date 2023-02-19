import { Icon24CameraOutline } from "@vkontakte/icons";
import {
  PanelHeader,
  Group,
  PanelHeaderBack,
  Div,
  FormLayout,
  FormItem,
  Input,
  DatePicker,
  FormLayoutGroup,
  Button,
  File,
  SegmentedControl,
} from "@vkontakte/vkui";
import { FormEvent, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-vkminiapps";

interface KeyValue {
  key: string;
  value: string;
  index: number;
}

const ProfilePanelNewTicket = ({ router }: { router: any }) => {
  const [indexCounter, setIndexCounter] = useState(0);
  const [valuePhoto, setValuePhoto] = useState<any>();
  const [keyValues, setKeyValues] = useState<KeyValue[]>([
    {
      key: "",
      value: "",
      index: indexCounter,
    },
  ]);

  const handleInputChange = (index: number, newKey: string, value: string) => {
    setIndexCounter(indexCounter + 1);
    // create a new array with the updated key-value pair
    const updatedKeyValues = [
      ...keyValues.map((item) => {
        if (item.index === index) {
          return {
            key: newKey,
            value,
            index,
          };
        }
        return item;
      }),
    ];
    // sort the key-value pairs by index
    const sortedKeyValues = updatedKeyValues.sort((a, b) => a.index - b.index);
    setKeyValues(sortedKeyValues);
  };

  const handleDeleteClick = (index: number) => {
    console.log(index, keyValues);
    // create a new array without the deleted key-value pair
    const updatedKeyValues = keyValues.filter((item) => item.index !== index);
    setKeyValues(updatedKeyValues);
  };

  useEffect(() => {
    // get item index
    // delete empty key-value pairs except the last one
    const updatedKeyValues = keyValues.filter(
      (item, index) => item.key || item.value || index === keyValues.length - 1
    );
    if (updatedKeyValues.length !== keyValues.length) {
      setKeyValues(updatedKeyValues);
      return;
    }

    // if all key-value pairs have been filled, add a new empty one
    const allFilled = keyValues.every((item) => item.key && item.value);
    if (allFilled) {
      setIndexCounter(indexCounter + 1);
      setKeyValues([
        ...keyValues,
        {
          key: "",
          value: "",
          index: indexCounter,
        },
      ]);
    }
    console.log(keyValues, indexCounter);
  }, [keyValues]);

  const onFileUpload = (e: any) => {
    setValuePhoto(e.target.files[0]);
  };
  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={() => router.toBack()} />}>
        Создание билета
      </PanelHeader>
      <Group>
        <FormLayout>
          <FormItem top="Название">
            <Input name="name" placeholder="Билет №1" required />
          </FormItem>
          <FormItem top="Описание">
            <Input name="description" placeholder="Хороший билет" required />
          </FormItem>
          <FormLayoutGroup mode="horizontal">
            <FormItem top="Загрузите ваше фото">
              <File
                onChange={onFileUpload}
                before={<Icon24CameraOutline role="presentation" />}
                size="m"
              >
                Открыть галерею
              </File>
            </FormItem>
            {valuePhoto && <p style={{ margin: 0 }}>{valuePhoto.name}</p>}
          </FormLayoutGroup>
          <FormItem top="Тип документа">
            <SegmentedControl
              size="m"
              name="type"
              options={[
                {
                  label: "Обычный",
                  value: "regular",
                },
                {
                  label: "VIP",
                  value: "vip",
                },
              ]}
            />
          </FormItem>
          {
            // Render the key-value input fields
            keyValues.map((item) => (
              <FormLayoutGroup
                removable
                onRemove={() => handleDeleteClick(item.index)}
                key={item.index}
                mode="horizontal"
              >
                <FormItem top="Ключ">
                  <Input
                    name="key"
                    placeholder="Ключ"
                    value={item.key}
                    onChange={(e) =>
                      handleInputChange(item.index, e.target.value, item.value)
                    }
                  />
                </FormItem>
                <FormItem top="Значение">
                  <Input
                    name="value"
                    placeholder="Значение"
                    value={item.value}
                    onChange={(e) =>
                      handleInputChange(item.index, item.key, e.target.value)
                    }
                  />
                </FormItem>
              </FormLayoutGroup>
            ))
          }
        </FormLayout>
      </Group>
    </>
  );
};

export default withRouter(ProfilePanelNewTicket);
