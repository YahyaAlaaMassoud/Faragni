
export class PagerService{
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 12){
        let totalPages: number = Math.ceil(totalItems / pageSize);
        let startPage: number;
        let endPage: number;
        if(totalPages <= 10){
            startPage = 1;
            endPage = totalPages;
        }
        else{
            if(currentPage <= 6){
                startPage = 1;
                endPage = 10;
            }
            else if(currentPage + 4 >= totalPages){
                startPage = totalPages - 9;
                endPage = totalPages;
            }
            else{
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages = Array.from(Array(endPage + 1 - startPage), (_ , i) => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}