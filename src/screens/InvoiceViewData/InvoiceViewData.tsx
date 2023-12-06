import React from 'react';
import { DashboardLayout } from '@/components/layouts';
import { BiChevronLeft } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
function InvoiceViewData() {
    const navigate = useNavigate();
    return (
        <DashboardLayout>
            <div className='w-[70%] py-[20px]'>
                <div className='container'>
                    <div className='flex items-center gap-[24px]'>
                        <button className='text-[#84818A] text-[24px]' onClick={() => { navigate('/invoiceview') }}><BiChevronLeft /></button>
                        <div className="text-[#2e2c34] leading-[20px] text-[24px] font-[600] font-[Manrope]">Invoice # 123456</div>
                    </div>
                    <div className='mt-[26px] mb-[30px]'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-[14px]'>
                                <div className='w-[48px] h-[48px] rounded-xl'>
                                    <img src="https://www.bhg.com/thmb/SfvVALaQxFyi4vYdbhBR11S41S8=/1280x0/filters:no_upscale():strip_icc()/indoor-potted-houseplants-703b321a-81cf8e1f9aee48a28e1be3bbc45e4386.jpg" alt="" className='w-full h-full rounded-xl object-cover' />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-[#2e2c34] text-[20px] font-[700] font-[Manrope]'>Wingreens Mart</span>
                                    <span className='text-[#84818A] text-[16px] font-[400] font-[Manrope]'>13 Nov 2019</span>
                                </div>
                            </div>
                            <div>
                                <button className='text-[#7CE7AC] bg-[#7CE7AC]/[0.1] w-[110px] rounded-lg h-[36px] font-[Lato] font-[700] text-[14px]'>Paid</button>
                            </div>
                        </div>
                    </div>
                    <div className='mb-[50px]'>
                        <div className='flex justify-between items-center mb-[20px]'>
                            <p className='text-[#84818A] font-[Lato] font-[700] text-[12px]'>From:</p>
                            <p className='text-[#84818A] font-[Lato] font-[700] text-[12px]'>Bill to:</p>
                        </div>
                        <div className='flex justify-between items-center mb-[20px]'>
                            <p className='text-[#84818A] font-[Lato] font-[700] text-[14px]'>MBW Bazaar</p>
                            <p className='text-[#84818A] font-[Lato] font-[700] text-[14px]'>Wingreens Mart</p>
                        </div>
                        <div className='border-[#EEEEEE] border-b pb-[27px]'>
                            <ul className='list-none m-0 p-0'>
                                <li className='flex justify-between items-center'>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>The Business Centre</p>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>3 Edgar Buildings</p>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>61 Wellfield Road</p>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>George Street</p>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>Roath</p>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>Bath</p>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>Cardiff</p>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>England</p>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>CF24 3DG</p>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>BA1 2FJ</p>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>mail@wonw.xyz</p>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>mail@dropdox.com</p>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>+1 456-980-3004</p>
                                    <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>+1 736-140-1003</p>
                                </li>
                            </ul>
                        </div>
                        <div className='mt-[22px]'>
                            <div className='mb-[17px]'>
                                <p className='text-[#2E2C34] text-[18px] font-[700] font-[Lato]'>
                                    Description
                                </p>
                            </div>
                            <table className='w-full text-left'>
                                <thead className='h-[39px] bg-[#F6F6F6]'>
                                    <tr>
                                        <th className='text-[#84818A] rounded-tl-[6.5px] rounded-bl-[6.5px] px-[14px] py-[10px] font-[Lato] font-[700] text-[12px]'>Item</th>
                                        <th className='text-[#84818A] font-[Lato] font-[700] text-[12px] w-[10%] px-[14px] py-[10px]'>Price</th>
                                        <th className='text-[#84818A] font-[Lato] font-[700] text-[12px] w-[10%] rounded-tr-[6.5px] rounded-br-[6.5px] px-[14px] py-[10px]'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='px-[14px] py-[8px]'>
                                            <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>
                                                Item Name
                                            </p>
                                        </td>
                                        <td className='px-[14px] py-[8px]'>
                                            <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>
                                                Rs. 10
                                            </p>
                                        </td>
                                        <td className='px-[14px] py-[8px]'>
                                            <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>
                                                Rs.3560
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='px-[14px] py-[8px]'>
                                            <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>
                                                Item Name
                                            </p>
                                        </td>
                                        <td className='px-[14px] py-[8px]'>
                                            <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>
                                                Rs. 10
                                            </p>
                                        </td>
                                        <td className='px-[14px] py-[8px]'>
                                            <p className='text-[#2E2C34] font-[Lato] font-[400] text-[14px]'>
                                                Rs.3560
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='flex justify-end'>
                                <div className='w-[250px]'>
                                    <div className='flex justify-between items-center mb-[16px]'>
                                        <p className='text-[#1C1D21] font-[Lato] font-[700] text-[14px]'>Subtotal</p>
                                        <p className='text-[#1C1D21] font-[Lato] font-[400] text-[14px]'>Rs. 11960</p>
                                    </div>
                                    <div className='flex justify-between items-center mb-[14px]'>
                                        <p className='text-[#1C1D21] font-[Lato] font-[700] text-[14px]'>GST 10%</p>
                                        <p className='text-[#1C1D21] font-[Lato] font-[400] text-[14px]'>Rs.1196</p>
                                    </div>
                                    <div className='flex justify-between items-center mb-[16px]'>
                                        <p className='text-[#1C1D21] font-[Lato] font-[700] text-[16px]'>Total</p>
                                        <p className='text-[#1C1D21] font-[Lato] font-[700] text-[16px]'>Rs.13156</p>
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

export default InvoiceViewData;