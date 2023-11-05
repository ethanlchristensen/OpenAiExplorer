import { Card, Text } from "@radix-ui/themes";

export default function Panel({ title, children }: any) {
    return (
        <Card variant='surface' className='h-[75vh]'>
            <div className='mb-2'>
                <Text as="div" size="2" weight="bold">
                    {title}
                </Text>
            </div>
            {/* <Separator size='4' color='yellow'></Separator> */}
            <div className='mt-2'>
                {children}
            </div>
        </Card>
    );
}