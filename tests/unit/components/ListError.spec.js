import { mount } from "@vue/test-utils";

import ListErrors from "../../../src/components/ListErrors.vue";

const createWrapper = ({ errors }) => {
  return mount(ListErrors, {
    propsData: {
      errors
    }
  });
};

describe("ListErrors", () => {
  let errors;

  beforeEach(() => {
    errors = {
      title: ["Title Error"],
      body: ["can't be blank"],
      description: ["can't be blank"]
    };
  });

  it("should have props with errors as type object", () => {
    const wrapper = createWrapper({ errors });
    expect(typeof wrapper.props().errors).toBe("object");
  });

});
