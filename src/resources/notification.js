export const NotifySucess = (vm, message) => {
    vm.$store.commit("SET_SNACKBAR", {
        message: message,
        value: true,
        status: "success"
      });
};

export const NotifyError = (vm, message) => {
    vm.$store.commit("SET_SNACKBAR", {
        message: message,
        value: true,
        status: "error"
      });
};