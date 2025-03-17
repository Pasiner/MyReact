'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams,usePathname,useRouter } from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce'
// 导出一个默认函数，用于搜索
// 导出一个默认的函数组件Search
// 导出一个默认函数Search，接收一个参数placeholder，类型为字符串
export default function Search({ placeholder }: { placeholder: string }) {
  // 使用useSearchParams钩子获取搜索参数
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace}=useRouter();
  // 定义一个函数，用于处理搜索
  const handleSearch = useDebouncedCallback((term) =>{
    // 创建一个新的URLSearchParams对象
    const params =new URLSearchParams(searchParams)
    params.set('page', '1');
    if (term){
      params.set('query', term);
    }else{
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
