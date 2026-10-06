// Placeholder blocks that mirror the real layout (same aspect ratios / heights)
// so content swaps in without shifting anything.
export const Skeleton = ({ className = '', ...rest }) => (
  <div aria-hidden="true" className={`skeleton rounded-md ${className}`} {...rest} />
)

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-white/60" aria-hidden="true">
      <Skeleton className="aspect-[16/11] rounded-none" />
      <div className="space-y-3 p-7 md:p-8">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2 pt-3">
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-14 rounded-full" />
        </div>
      </div>
    </div>
  )
}
