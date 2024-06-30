import { Modal } from 'antd'
import { ComponentType, Dispatch, SetStateAction } from 'react'

interface WithCenterAlignPopupProps {
    isCenterAlignPopupOpen: boolean
    setIsCenterAlignPopupOpen?: Dispatch<SetStateAction<boolean>>
    isFullWidth?: boolean
    isBlurRemoved?: boolean
    isCloseButtonDisplay?: boolean
    className?: string
    isNonClosable?: boolean
}

export function withCenterAlignPopup<P>(Component: ComponentType<P>) {
    return function CenterAlignPopup(props: P & WithCenterAlignPopupProps) {
        const {
            isCenterAlignPopupOpen,
            setIsCenterAlignPopupOpen,
            className = '',
            isBlurRemoved,
            isFullWidth,
            isCloseButtonDisplay=true,
            isNonClosable=false,
        } = props

        const handleCancel = () => {
            if (setIsCenterAlignPopupOpen && !isNonClosable) {
                setIsCenterAlignPopupOpen(false)
            }
        }
        const isMobile = window.innerWidth <= 768
        return (
            <Modal
                open={isCenterAlignPopupOpen}
                onCancel={handleCancel}
                footer={null}
                title={null}
                width={'full'}
                maskClosable={true}
                centered={!isMobile}
                keyboard={true}
                wrapClassName={`${isFullWidth ? 'w-full' : ''}  ${className} ${
                    isMobile ? 'full-width-bottom-align-popup !max-w-full ' : 'center-align-popup'
                } `}
                className={` ${isMobile ? '!max-w-full !pb-0' : ''} `}
                style={{
                    bottom: '0px',
                    fontFamily: 'Sora',
                    paddingBottom: 0,
                }}
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
                        padding: 0,
                    },
                }}
                closeIcon={isCloseButtonDisplay || false}
                mask
                destroyOnClose
            >
                <Component {...props} />
            </Modal>
        )
    }
}
