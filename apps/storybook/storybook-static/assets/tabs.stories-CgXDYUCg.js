import{f as o,r as e,g as c,h as a,i as n,T as t}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Components/Tabs",component:o,tags:["autodocs"]},l={render:()=>e.createElement(o,{defaultValue:"account"},e.createElement(c,null,e.createElement(a,{value:"account"},"Account"),e.createElement(a,{value:"security"},"Security"),e.createElement(a,{value:"billing"},"Billing")),e.createElement(n,{value:"account"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"Account settings content. Use arrow keys to move between tabs.")),e.createElement(n,{value:"security"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"Security and sessions.")),e.createElement(n,{value:"billing"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"Plans and invoices.")))},r={render:function(){const[b,i]=e.useState("b");return e.createElement(o,{value:b,onValueChange:i},e.createElement(c,null,e.createElement(a,{value:"a"},"Alpha"),e.createElement(a,{value:"b"},"Beta"),e.createElement(a,{value:"c"},"Gamma")),e.createElement(n,{value:"a"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"Panel A (controlled: ",b,")")),e.createElement(n,{value:"b"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"Panel B")),e.createElement(n,{value:"c"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"Panel C")))}},s={render:()=>e.createElement(o,{defaultValue:"one"},e.createElement(c,null,e.createElement(a,{value:"one"},"Available"),e.createElement(a,{value:"two",disabled:!0},"Disabled"),e.createElement(a,{value:"three"},"Another")),e.createElement(n,{value:"one"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"First panel.")),e.createElement(n,{value:"two"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"Not reachable when disabled.")),e.createElement(n,{value:"three"},e.createElement(t,{variant:"body-sm",as:"p",style:{margin:0}},"Third panel.")))};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="account">
            <TabList>
                <Tab value="account">Account</Tab>
                <Tab value="security">Security</Tab>
                <Tab value="billing">Billing</Tab>
            </TabList>
            <TabPanel value="account">
                <Typography variant="body-sm" as="p" style={{
        margin: 0
      }}>
                    Account settings content. Use arrow keys to move between tabs.
                </Typography>
            </TabPanel>
            <TabPanel value="security">
                <Typography variant="body-sm" as="p" style={{
        margin: 0
      }}>
                    Security and sessions.
                </Typography>
            </TabPanel>
            <TabPanel value="billing">
                <Typography variant="body-sm" as="p" style={{
        margin: 0
      }}>
                    Plans and invoices.
                </Typography>
            </TabPanel>
        </Tabs>
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: function ControlledTabs() {
    const [value, setValue] = React.useState("b");
    return <Tabs value={value} onValueChange={setValue}>
                <TabList>
                    <Tab value="a">Alpha</Tab>
                    <Tab value="b">Beta</Tab>
                    <Tab value="c">Gamma</Tab>
                </TabList>
                <TabPanel value="a">
                    <Typography variant="body-sm" as="p" style={{
          margin: 0
        }}>
                        Panel A (controlled: {value})
                    </Typography>
                </TabPanel>
                <TabPanel value="b">
                    <Typography variant="body-sm" as="p" style={{
          margin: 0
        }}>
                        Panel B
                    </Typography>
                </TabPanel>
                <TabPanel value="c">
                    <Typography variant="body-sm" as="p" style={{
          margin: 0
        }}>
                        Panel C
                    </Typography>
                </TabPanel>
            </Tabs>;
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="one">
            <TabList>
                <Tab value="one">Available</Tab>
                <Tab value="two" disabled>
                    Disabled
                </Tab>
                <Tab value="three">Another</Tab>
            </TabList>
            <TabPanel value="one">
                <Typography variant="body-sm" as="p" style={{
        margin: 0
      }}>
                    First panel.
                </Typography>
            </TabPanel>
            <TabPanel value="two">
                <Typography variant="body-sm" as="p" style={{
        margin: 0
      }}>
                    Not reachable when disabled.
                </Typography>
            </TabPanel>
            <TabPanel value="three">
                <Typography variant="body-sm" as="p" style={{
        margin: 0
      }}>
                    Third panel.
                </Typography>
            </TabPanel>
        </Tabs>
}`,...s.parameters?.docs?.source}}};const T=["Default","Controlled","DisabledTab"];export{r as Controlled,l as Default,s as DisabledTab,T as __namedExportsOrder,p as default};
