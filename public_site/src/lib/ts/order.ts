const sortPost = (listPost: any[], orderBy = "date-update", order = "descending"):any[] => {
    const posts = [...listPost];
    let result;
    match(orderBy)
        .on(o => o === "date-creation", () => {result = sortDateCreate(posts, order)})
        .on(o => o === "date-update", () => {result = sortDateUpdate(posts, order)})
        .on(o => o === "title", () => {result = sortTitle(posts, order)})
        .otherwise(o => () => {result = sortTitle(posts, order)});
    return result;
}

export default sortPost;

function sortDateCreate(listPost: any[], order = "descending"): any[] {
    const posts = [...listPost];
    posts.sort((a, b) => {
		const postA = +new Date(a?.metadata?.date?.created ? a.metadata.date.created : '1990-01-01');
		const postB = +new Date(b?.metadata?.date?.created ? b.metadata.date.created : '1990-01-01');
		return  order === "ascending" ? postA - postB : postB - postA;
	});
    return posts;
}

function sortDateUpdate(listPost: any[], order = "descending"): any[] {
    const posts = [...listPost];
    posts.sort((a, b) => {
		const postA = +new Date(a?.metadata?.date?.updated ? a.metadata.date.updated : '1990-01-01');
		const postB = +new Date(b?.metadata?.date?.updated ? b.metadata.date.updated : '1990-01-01');
		return  order === "ascending" ? postA - postB : postB - postA;
	});
    return posts;
}

function sortTitle(listPost: any[], order = "ascending"):any[] {
        const posts = [...listPost];
    posts.sort((a, b) => {
        const postA = a?.metadata?.title ? a.metadata.title : 'zzzzzzzzzzzzzzzzzzzzz';
		 const postB = b?.metadata?.title ? b.metadata.title : 'zzzzzzzzzzzzzzzzzzzzz';

		return  order === "ascending" ? postA.localeCompare(postB) : postB.localeCompare(postA);
	});
    return posts;
}


const matched = (x: any) => ({
  on: () => matched(x),
  otherwise: () => x,
})

const match = (x: any) => ({  
  on: (pred: (arg0: any) => any, fn: (arg0: any) => any) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: (fn: (arg0: any) => any) => fn(x),
})