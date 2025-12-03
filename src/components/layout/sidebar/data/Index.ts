import * as Icons from "../../../../assets/icon/Icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "داشبورد",
        icon: Icons.HomeIcon,
        url: "/",
        items: [
        //   {
        //     title: "eCommerce",
        //     url: "/",
        //   },
        ],
      },
      {
        title: "دانش آموزان",
        url: "/students",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "معلم ها",
        url: "/teachers",
        icon: Icons.User,
        items: [],
      },
      {
        title: "کلاس ها",
        icon: Icons.Alphabet,
        url: "/classes",
        items: [
        //   {
        //     title: "Form Elements",
        //     url: "/forms/form-elements",
        //   },
        //   {
        //     title: "Form Layout",
        //     url: "/forms/form-layout",
        //   },
        ],
      },
      {
        title: "حضور و غیاب",
        url: "/attendance",
        icon: Icons.Table,
        items: [
        //   {
        //     title: "Tables",
        //     url: "/tables",
        //   },
        ],
      },
    //   {
    //     title: "Pages",
    //     icon: Icons.Alphabet,
    //     items: [
    //       {
    //         title: "Settings",
    //         url: "/pages/settings",
    //       },
    //     ],
    //   },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
