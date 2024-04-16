import React, { FormEvent } from 'react'

type Props = {
    onChangeHandle : (value : string) => void;
    classNames: string;
    Value: string;
    Id: string;
    PlaceHolder: string;
    Type: string;
}

const Input = ({ onChangeHandle, Id, PlaceHolder, Type, Value, classNames }: Props) => {
    return (
        <>
            <input type={`${Type}`} id={`${Id}`} value={`${Value}`} className={`${classNames}`} placeholder={`${PlaceHolder}`}  />
        </>
    )
}

export default Input