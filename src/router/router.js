import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/layout/layout";
import Account from "@/components/account/account";
import updateConsultation from "@/components/updateConsultation";
import updateRecords from "@/components/updateRecords";
import updateSucursales from "@/components/updateSucursales";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      props: true,
      children: [
        {
          path: "general",
          name: "general_data",
          component: () =>
            import("@/components/electronic_record/general_data"),
        },
        {
          path: "antecedent",
          name: "antecedent",
          component: () => import("@/components/electronic_record/antecedent"),
        },
        {
          path: "surgeries",
          name: "surgeries",
          component: () =>
            import("@/components/electronic_record/previous_surgeries"),
        },
        {
          path: "other",
          name: "other",
          component: () => import("@/components/electronic_record/other_data"),
        },
        {
          path: "visual_acuity",
          name: "visual_acuity",
          component: () =>
            import("@/components/electronic_record/visual_acuity"),
        },
        {
          path: "autorefraction_a",
          name: "autorefraction_a",
          component: () =>
            import("@/components/electronic_record/autorefraction_a"),
        },
        {
          path: "keratometry",
          name: "keratometry",
          component: () => import("@/components/electronic_record/keratometry"),
        },
        {
          path: "lensometry",
          name: "lensometry",
          component: () => import("@/components/electronic_record/lensometry"),
        },
        {
          path: "tonometry",
          name: "tonometry",
          component: () => import("@/components/electronic_record/tonometry"),
        },
        {
          path: "general_opt",
          name: "general_data_opt",
          component: () =>
            import("@/components/electronic_record/general_data_opt"),
        },
        {
          path: "visual_acuity_opt",
          name: "visual_acuity_opt",
          component: () =>
            import("@/components/electronic_record/visual_acuity_opt"),
        },
        {
          path: "refraction",
          name: "refraction",
          component: () => import("@/components/electronic_record/refraction"),
        },
        {
          path: "rx_final_glasses",
          name: "rx_final_glasses",
          component: () =>
            import("@/components/electronic_record/rx_final_glasses"),
        },
        {
          path: "rx_final_contact_lenses",
          name: "rx_final_contact_lenses",
          component: () =>
            import("@/components/electronic_record/rx_final_contact_lenses"),
        },
        {
          path: "rx_final_doble_orden",
          name: "rx_final_doble_orden",
          component: () =>
            import("@/components/electronic_record/rx_final_doble"),
        },
        // {
        //   path: "rx_final_next_vision",
        //   name: "rx_final_next_vision",
        //   component: () =>
        //     import("@/components/electronic_record/rx_final_next_vision"),
        // },
        // {
        //   path: "rx_final_intermediate",
        //   name: "rx_final_intermediate",
        //   component: () =>
        //     import("@/components/electronic_record/rx_final_intermediate"),
        // },
        {
          path: "diagnosis",
          name: "diagnosis",
          component: () => import("@/components/electronic_record/diagnosis"),
        },
        {
          path: "antecedent_oft",
          name: "antecedent_oft",
          component: () =>
            import("@/components/electronic_record/antecedent_oft"),
        },
        {
          path: "clinic_history",
          name: "clinic_history",
          component: () =>
            import("@/components/electronic_record/clinic_history"),
        },
        {
          path: "preliminary_data",
          name: "preliminary_data",
          component: () =>
            import("@/components/electronic_record/preliminary_data"),
        },
        {
          path: "treatment_plan",
          name: "treatment_plan",
          component: () =>
            import("@/components/electronic_record/treatment_plan"),
        },
        {
          path: "diagnosis_oft",
          name: "diagnosis_oft",
          component: () =>
            import("@/components/electronic_record/diagnosis_oft"),
        },
        {
          path: "observations",
          name: "observations",
          component: () =>
            import("@/components/electronic_record/observations"),
        },
        {
          path: "preliminary_form",
          name: "preliminary_form",
          component: () =>
            import("@/components/preliminary_form/preliminary_form"),
        },
        {
          path: "nursing_sheet",
          name: "nursing_sheet",
          component: () => import("@/components/nursing_sheet/nursing_sheet"),
        },
      ],
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      props: true,
    },
    {
      path: "/updateConsultation",
      name: "updateConsultation",
      component: updateConsultation,
      props: true,
    },
    {
      path: "/updateRecords",
      name: "updateRecords",
      component: updateRecords,
      props: true,
    },
    {
      path: "/updateSucursales",
      name: "updateSucursales",
      component: updateSucursales,
      props: true,
    },
  ],
});
