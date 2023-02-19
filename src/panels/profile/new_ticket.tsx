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
  const [valuePhoto, setValuePhoto] = useState<any>();
  const [keyValues, setKeyValues] = useState<KeyValue[]>([
    {
      key: "",
      value: "",
      index: 0,
    },
  ]);
  let indexCounter = 1;

  const addKeyValue = () => {
    const newKeyValues = { ...keyValues };
    newKeyValues.push({
      key: "",
      value: "",
      index: indexCounter,
    });
    setKeyValues(newKeyValues);
    indexCounter++;
  };

  const removeKeyValue = (index: number) => {
    const newKeyValues = { ...keyValues };
    delete newKeyValues[index];
    setKeyValues(newKeyValues);
  };

  const handleKeyValueChange = (
    e: FormEvent<HTMLInputElement>,
    pair: KeyValue
  ) => {
    const newKeyValues = { ...keyValues };
    newKeyValues[pair.index] = {
      key: e.currentTarget.value,
      value: pair.value,
      index: pair.index,
    };
    setKeyValues(newKeyValues);
  };

  const onFileUpload = (e: any) => {
    setValuePhoto(e.target.files[0]);
  };

  useEffect(() => {
    // if all key-value pairs are filled, add a new empty one
    const allFilled = keyValues.every((pair) => pair.key && pair.value);
    if (allFilled) {
      addKeyValue();
    }
  }, [keyValues]);

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
            keyValues.map((pair) => (
              <FormLayoutGroup
                mode="horizontal"
                key={pair.index}
                removable
                onRemove={() => removeKeyValue(pair.index)}
              >
                <FormItem top="Ключ">
                  <Input
                    name="key"
                    value={pair.key}
                    onChange={(e) => handleKeyValueChange(e, pair)}
                    placeholder="Ключ"
                    required
                  />
                </FormItem>
                <FormItem top="Значение">
                  <Input
                    name="value"
                    value={pair.value}
                    onChange={(e) => handleKeyValueChange(e, pair)}
                    placeholder="Значение"
                    required
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
