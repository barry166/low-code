import { nanoid } from "nanoid";
import { ISliderItem } from "../types";
import { COLUMN, COMPONENT, ROW, SIDEBAR_ITEM } from "./type";

export const SIDEBAR_ITEMS: ISliderItem[] = [
  {
    id: nanoid(),
    type: SIDEBAR_ITEM,
    component: {
      type: "input",
      content: "Some input field",
    },
  },
  {
    id: nanoid(),
    type: SIDEBAR_ITEM,
    component: {
      type: "name",
      content: "Some name",
    },
  },
  {
    id: nanoid(),
    type: SIDEBAR_ITEM,
    component: {
      type: "email",
      content: "Some email",
    },
  },
  {
    id: nanoid(),
    type: SIDEBAR_ITEM,
    component: {
      type: "phone",
      content: "Some phone",
    },
  },
  {
    id: nanoid(),
    type: SIDEBAR_ITEM,
    component: {
      type: "image",
      content: "Some image",
    },
  },
];

export const initialData = {
  layout: [
    {
      type: ROW,
      id: "row0",
      children: [
        {
          type: COLUMN,
          id: "column0",
          children: [
            {
              type: COMPONENT,
              id: "component1",
            },
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },
        {
          type: COLUMN,
          id: "column1",
          children: [
            {
              type: COMPONENT,
              id: "component3",
            },
          ],
        },
      ],
    },
    {
      type: ROW,
      id: "row1",
      children: [
        {
          type: COLUMN,
          id: "column2",
          children: [
            {
              type: COMPONENT,
              id: "component4",
            },
            {
              type: COMPONENT,
              id: "component5",
            },
            {
              type: COMPONENT,
              id: "component6",
            },
          ],
        },
      ],
    },
  ],
  components: {
    component0: {
      id: "component0",
      type: "input",
      content: "Some input",
      controlProps: {},
    },
    component1: {
      id: "component1",
      type: "button",
      content: "Some image",
      controlProps: {},
    },
    component2: {
      id: "component2",
      type: "email",
      content: "Some email",
      controlProps: {},
    },
    component3: {
      id: "component3",
      type: "name",
      content: "Some name",
      controlProps: {},
    },
    component4: {
      id: "component4",
      type: "input",
      content: "Some phone",
      controlProps: {},
    },
    component5: {
      id: "component5",
      type: "input",
      content: "last one phone",
      controlProps: {},
    },
    component6: {
      id: "component6",
      type: "input",
      content: "last phone",
      controlProps: {},
    },
  },
};
