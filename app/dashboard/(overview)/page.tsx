import { Card } from "../../ui/dashboard/cards";
import RevenueChart from "../../ui/dashboard/revenue-chart";
import LatestInvoices  from "../../ui/dashboard/latest-invoices";
import { lusitana } from "../../ui/fonts";
import {fetchCardData} from '@/app/lib/data'
import { Suspense } from "react";
import {RevenueChartSkeleton,LatestInvoicesSkeleton,CardSkeleton} from "../../ui/skeletons";
import CardWrapper from "../../ui/dashboard/cards";
// 导出一个默认的异步函数Page
export default async function Page() {
    const cardData = await fetchCardData();
    const {totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers} = cardData;
  // 返回一个main标签
  return (
    <main>
     <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton/>}>
          <CardWrapper></CardWrapper>
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton/>}>
          <RevenueChart />
          </Suspense>
          <Suspense fallback={<LatestInvoicesSkeleton/>}>
           <LatestInvoices />
          </Suspense>
    
      </div>
    </main>
  );
}