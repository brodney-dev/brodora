import{b as n,B as o,T as t,S as s}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Components/Divider",component:n,tags:["autodocs"],argTypes:{orientation:{control:"select",options:["horizontal","vertical"]}}},e={args:{orientation:"horizontal"},render:r=>React.createElement(o,{sx:{maxWidth:360}},React.createElement(t,{variant:"body-sm",as:"p"},"Section one"),React.createElement(n,{...r}),React.createElement(t,{variant:"body-sm",as:"p"},"Section two"))},a={args:{orientation:"vertical"},render:r=>React.createElement(s,{direction:"row",spacing:2,alignItems:"center",style:{minHeight:48}},React.createElement(t,{variant:"body-sm",as:"span"},"Left"),React.createElement(n,{...r}),React.createElement(t,{variant:"body-sm",as:"span"},"Right"))};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal"
  },
  render: args => <Box sx={{
    maxWidth: 360
  }}>
            <Typography variant="body-sm" as="p">
                Section one
            </Typography>
            <Divider {...args} />
            <Typography variant="body-sm" as="p">
                Section two
            </Typography>
        </Box>
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: "vertical"
  },
  render: args => <Stack direction="row" spacing={2} alignItems="center" style={{
    minHeight: 48
  }}>
            <Typography variant="body-sm" as="span">
                Left
            </Typography>
            <Divider {...args} />
            <Typography variant="body-sm" as="span">
                Right
            </Typography>
        </Stack>
}`,...a.parameters?.docs?.source}}};const m=["Horizontal","Vertical"];export{e as Horizontal,a as Vertical,m as __namedExportsOrder,p as default};
