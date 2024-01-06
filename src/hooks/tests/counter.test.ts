import '@testing-library/jest-dom';
import {renderHook} from "@testing-library/react";
import {useCounter} from "../counter";

describe('useCounter', () => {

  it('setups initially correctly', () => {

    const { result } = renderHook(useCounter);

    expect(result.current[0]).toBe(0);

  });

});
