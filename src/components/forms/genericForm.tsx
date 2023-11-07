import { Slider, TextArea, Text, Select, Button } from "@radix-ui/themes";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import apiHandler from '../../api/apis';
import SliderPanel from '../ui/sliderPanel';

const FormSchema = z.object({
    type: z.string(),
    data: z
        .string({ required_error: "You must enter data!" })
        .min(1, { message: "You must enter data!" }),
    tokens: z.number().array(),
    temp: z.number().array(),
});

export default function GenericForm({ callbackResponse } : any) {
    const [formResponse, setFormResponse] = useState({});
    useEffect(() => {
        callbackResponse(formResponse);
    }, [callbackResponse, formResponse]);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            type: "summarize",
            data: "",
            tokens: [500],
            temp: [0.5],
        },
    });

    async function postToApi(data: any) {
        var response = await apiHandler(data.type, data.data, data.tokens[0], data.temp[0]);
        console.log(response);
        setFormResponse({data: response, loading: false});
    }

    function onSubmit(form: any) {
        postToApi(form);
        setFormResponse({data: '', loading: true});
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <Controller
                control={control}
                name="type"
                render={({ field }) => (
                    <>
                        <div className='w-full flex align-center'>
                            <Select.Root defaultValue={field.value} onValueChange={field.onChange}>
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Label>Action</Select.Label>
                                        <Select.Item value="summarize">Summarize</Select.Item>
                                        <Select.Item value="topicExtraction">Extarct Topics</Select.Item>
                                        <Select.Item value="generate">Generate</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                            <div className='mx-2'>
                                <Button variant='surface' color='purple' type='submit'>Run</Button>
                            </div>
                        </div>
                    </>
                )}
            />
            <Controller
                control={control}
                name="tokens"
                render={({ field }) => (
                    <>
                        <SliderPanel title='Max Tokens' step={1} max={1000} onValueChange={field.onChange} value={field.value} />
                    </>
                )}
            />
            <Controller
                control={control}
                name="temp"
                render={({ field }) => (
                    <>
                        <SliderPanel title='Temperature' step={0.01} max={1.00} onValueChange={field.onChange} value={field.value} />
                    </>
                )}
            />
            <Controller
                control={control}
                name="data"
                render={({ field }) => (
                    <>
                        <div className='mt-2'>
                            <Text as="div" size="1" weight="bold">
                                Input
                            </Text>
                        </div>
                        <div className='mt-2'>
                            <TextArea className='h-[25vh] ' placeholder='Enter your text' defaultValue={field.value} onChange={field.onChange}></TextArea>
                        </div>
                    </>
                )}
            />
        </form>
    )
}