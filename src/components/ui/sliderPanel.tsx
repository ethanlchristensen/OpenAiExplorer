import { Slider, Text } from "@radix-ui/themes";
import { useState } from 'react';

export default function SliderPanel({ step, max, title, value, onValueChange, children }: any) {
    return (
        <div>
            <div className='mt-2'>
                <Text as="div" size="1" weight="bold">
                    {title}
                </Text>
            </div>
            <Slider className='mt-1' variant='surface' step={step} max={max} defaultValue={[value]} onValueChange={onValueChange} />
            <div className="mt-2">
            <Text as="div" size="1" className="mt-2">
                {value}
            </Text>
            </div>
            <div className='mt-2'>
                {children}
            </div>
        </div>
    );
}