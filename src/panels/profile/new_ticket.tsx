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
import { useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";

interface KeyValue {
  key: string;
  value: string;
  index: number;
}

const ProfilePanelNewTicket = ({ router }: { router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const [indexCounter, setIndexCounter] = useState(0);
  const [valuePhoto, setValuePhoto] = useState<any>();
  const [valueName, setValueName] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueType, setValueType] = useState("regular");
  const [error, setError] = useState("");
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
  }, [keyValues]);

  const onFileUpload = (e: any) => {
    // const reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = () => {
    //   console.log(reader.result);
    // };
    // reader.onerror = (error) => {
    //   console.log("Error: ", error);
    // };

    setValuePhoto(e.target.files[0]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // validate the form
    if (!valueName || !valueDescription || !valuePhoto) {
      setError("Заполните все поля");
      return;
    }
    setError("");

    const keyValuesObject: any = {};
    keyValues.forEach((item) => {
      if (item.key && item.value) {
        keyValuesObject[item.key] = item.value;
      }
    });
    // upload valuePhoto to https://pics.seizure.icu/api/upload.php
    // and get the link to the uploaded image
    console.log(valuePhoto);
    // const data = fetch("https://pics.seizure.icu/api/upload.php", {
    //   method: "POST",
    //   body: valuePhoto,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //     return data;
    //   });
    const formDataImg = new FormData();
    formDataImg.append("file", valuePhoto);
    const imgSrc = fetch("https://pics.seizure.icu/api/upload.php", {
      method: "POST",
      body: formDataImg,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        // create a FormData object to send to the server
        const formData = new FormData();
        formData.append("title", valueName);
        formData.append("description", valueDescription);
        formData.append("type", valueType);
        formData.append("keyValues", keyValuesObject);
        formData.append("eventId", mainStorage.profilePanelEventId);
        formData.append("imgSrc", data.url);

        console.log(keyValuesObject);
      });
    console.log(imgSrc);

    // send the form data to the server
    // fetch("https://example.com", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={() => router.toBack()} />}>
        Создание билета
      </PanelHeader>
      <Group>
        <FormLayout onSubmit={handleSubmit}>
          <FormItem top="Название">
            <Input
              name="name"
              placeholder="Билет №1"
              required
              value={valueName}
              onChange={(e) => setValueName(e.target.value)}
            />
          </FormItem>
          <FormItem top="Описание">
            <Input
              name="description"
              placeholder="Хороший билет"
              required
              value={valueDescription}
              onChange={(e) => setValueDescription(e.target.value)}
            />
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
          <FormItem top="Тип билета">
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
              defaultValue="regular"
              onChange={(e) => setValueType(String(e))}
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Div>
            <Button size="l" stretched type="submit">
              Создать билет
            </Button>
          </Div>
        </FormLayout>
      </Group>
    </>
  );
};

export default withRouter(ProfilePanelNewTicket);
