export default function TransactionSkeleton() {
  return (
    <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4 animate-pulse">
      <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 col-span-full md:col-span-2">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
        <div className="space-y-2 border md:border-none p-3 rounded-md md:p-0 border-line">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
        <div className="space-y-2 border md:border-none p-3 rounded-md md:p-0 border-line">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
        <div className="space-y-2 border md:border-none p-3 rounded-md md:p-0 border-line">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
        <div className="space-y-2 border md:border-none p-3 rounded-md md:p-0 border-line">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
      </div>
      <div className="flex justify-end md:border-t border-0 border-line pt-4 mt-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  );
}
