import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxMDYyMiwiZXhwIjoxOTU4ODg2NjIyfQ.NLskW99hirrjF4z9sILOupvgDtMZmr5b9THI2OQAbyY';
const SUPABASE_URL = 'https://kmozqqxenyqwiqnidnwg.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    

export default function ChatPage() {

    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagens, setListaMensagens] = React.useState([]);
    
    React.useEffect(()=>{
        supabase
        .from('mensagens')
        .select('*')
        .order('id', {ascending: false})
        .then(
            ({data})=> {
                setListaMensagens(data);
            }
        );
        }, []

    )
    

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaMensagens.length + 1,
            de: 'semasantos',
            texto: novaMensagem,
            // created_at: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),

        };

        supabase
            .from('mensagens')
            .insert([mensagem])
            .then(
                ({data}) => {
                    setListaMensagens([data[0], ...listaMensagens], );
                }
            )
        
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* Mensagem sendo digitada:<br/> {mensagem} <br/>
                    Lista de mensagens:
                    {listaMensagens.map((mensagemAtual) => {
                            return(
                                <li key={mensagemAtual.id}>
                                    {mensagemAtual.de} {mensagemAtual.id}: {mensagemAtual.texto}
                                </li>
                            )
                          }
                        )   
                    } */}
                    <MessageList mensagens={listaMensagens} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >

                        <TextField
                            value={mensagem}
                            onChange={
                                (evento) => {
                                    var valor = evento.target.value;
                                    setMensagem(valor);
                                }
                            }
                            onKeyPress={
                                (evento) => {
                                    if (evento.key == 'Enter') {
                                        evento.preventDefault();
                                        handleNovaMensagem(mensagem);
                                    }
                                }
                            }
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            // onClick={
                            //     handleNovaMensagem(mensagem)
                            // }
                            type='submit'
                            label='Enviar'
                            // fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            // src={'../Clara.png'}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {mensagem.created_at}
                            </Text>
                            {/* <Button
                                variant='tertiary'
                                colorVariant='neutral'
                                label='X'
                                href="/"
                                styleSheet={{
                                    marginRight: '10',
                                }}
                            /> */}
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            }

            )

            }


        </Box>
    )
}