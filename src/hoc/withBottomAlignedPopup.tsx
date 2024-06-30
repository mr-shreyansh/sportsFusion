import { Modal } from 'antd'
import { ComponentType, Dispatch, SetStateAction } from 'react'

interface WithBottomAlignPopupProps {
    isCenterAlignPopupOpen: boolean
    setIsCenterAlignPopupOpen?: Dispatch<SetStateAction<boolean>>
    isFullWidth?: boolean
    isBlurRemoved?: boolean
    isCloseButtonDisplay?: boolean
    className?: string
    isNonClosable?: boolean
}

export function withBottomAlignPopup<P>(Component: ComponentType<P>) {
    return function CenterAlignPopup(props: P & WithBottomAlignPopupProps) {
        const {
            isCenterAlignPopupOpen,
            setIsCenterAlignPopupOpen,
            className = '',
            isBlurRemoved,
            isFullWidth,
            isCloseButtonDisplay,
            isNonClosable,
        } = props

        const handleCancel = () => {
            if (setIsCenterAlignPopupOpen && !isNonClosable) {
                setIsCenterAlignPopupOpen(false)
            }
        }

        return (
            <Modal
                open={isCenterAlignPopupOpen}
                onCancel={handleCancel}
                footer={null}
                maskClosable={true}
                centered={false}
                keyboard={true}
                wrapClassName={`${
                    isFullWidth ? 'w-full' : ''
                }  ${className} ${'full-width-bottom-align-popup !max-w-full !max-h-[100vh]'} `}
                className={`!min-w-full !pb-0'`}
                style={{ top: '0px', fontFamily: 'Sora', paddingBottom: 0 }}
                styles={{
                    mask: {
                        backdropFilter: isBlurRemoved ? 'none' : 'blur(15px)',
                        transition: 'all 500ms ease-in-out',
                    },
                    content: {
                        padding: 0,
                        background: 'transparent',
                        boxShadow: 'none',
                    },
                    body: {
                        padding: '0 0 0 0',
                    },
                }}
                closeIcon={isCloseButtonDisplay}
                mask
            >
                <Component {...props} />
            </Modal>
        )
    }
}
