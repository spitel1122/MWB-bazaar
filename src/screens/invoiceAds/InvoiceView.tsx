import React from 'react';
import { DashboardLayout } from '@/components/layouts';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft } from 'react-icons/bi';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function InvoiceView() {
    const navigate = useNavigate();
    return (
        <DashboardLayout>
            <div className='w-full py-[20px]'>
                <div className='container'>
                    <div className='flex items-center gap-[24px]'>
                        <button className='text-[#84818A] text-[24px]' onClick={() => { navigate('/advertisement') }}><BiChevronLeft /></button>
                        <div className="text-[#2e2c34] leading-[20px] text-[24px] font-[600] font-[Manrope]">Invoice - Wingreens Mart</div>
                    </div>
                    <div className='flex w-full items-center gap-[24px] mt-[41px] mb-[24px]'>
                        <div className='w-[50%] flex flex-col gap-[10px] py-[20px] pl-[24px]'>
                            <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Paid</span>
                            <p className='text-[#2e2c34] text-[24px] font-[600] font-[inter]'>Rs. 19,100.00</p>
                        </div>
                        <div className='w-[50%] flex flex-col gap-[10px] py-[20px] pl-[24px]'>
                            <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>To be paid</span>
                            <p className='text-[#2e2c34] text-[24px] font-[600] font-[inter]'>Rs. 18,000.00</p>
                        </div>
                    </div>
                    <div className='mb-[48px]'>
                        <p className='text-[#2e2c34] text-[14px] font-[700] font-[Manrope]'>Payment Awaited (4)</p>
                        <div className='mt-[17px]'>
                            <div className='w-full flex flex-col gap-[24px]'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-[22px]'>
                                        <span className='text-[#84818A]'><CreditCardIcon fontSize={'small'} /></span>
                                        <div className='flex flex-col'>
                                            <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Invoice # 12345</span>
                                            <span className='text-[#84818A] text-[12px] font-[500] font-[Manrope]'>Jul 29, 2022</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-[52px]'>
                                        <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Rs. 10,000.00</span>
                                        <button className='text-[#84818A]' onClick={() => { navigate('/invoiceData') }}><MoreHorizIcon fontSize={'small'} /></button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-[22px]'>
                                        <span className='text-[#84818A]'><CreditCardIcon fontSize={'small'} /></span>
                                        <div className='flex flex-col'>
                                            <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Invoice # 12345</span>
                                            <span className='text-[#84818A] text-[12px] font-[500] font-[Manrope]'>Jul 29, 2022</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-[52px]'>
                                        <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Rs. 10,000.00</span>
                                        <button className='text-[#84818A]'><MoreHorizIcon fontSize={'small'} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-[24px]'>
                        <p className='text-[#2e2c34] text-[14px] font-[700] font-[Manrope]'>Paid (2)</p>
                        <div className='mt-[17px]'>
                            <div className='w-full flex flex-col gap-[24px]'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-[22px]'>
                                        <span className='text-[#84818A]'><CreditCardIcon fontSize={'small'} /></span>
                                        <div className='flex flex-col'>
                                            <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Invoice # 12345</span>
                                            <span className='text-[#84818A] text-[12px] font-[500] font-[Manrope]'>Jul 29, 2022</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-[52px]'>
                                        <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Rs. 10,000.00</span>
                                        <button className='text-[#84818A]'><MoreHorizIcon fontSize={'small'} /></button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-[22px]'>
                                        <span className='text-[#84818A]'><CreditCardIcon fontSize={'small'} /></span>
                                        <div className='flex flex-col'>
                                            <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Invoice # 12345</span>
                                            <span className='text-[#84818A] text-[12px] font-[500] font-[Manrope]'>Jul 29, 2022</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-[52px]'>
                                        <span className='text-[#2e2c34] text-[14px] font-[600] font-[Manrope]'>Rs. 10,000.00</span>
                                        <button className='text-[#84818A]'><MoreHorizIcon fontSize={'small'} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default InvoiceView;