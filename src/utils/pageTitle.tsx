import { useEffect } from 'react'
import { useLocation } from 'react-router'

type PageTitleProps = {
    title: string
}

/**Custom hook to update the page title dynamically based on the current route path
 * This is useful for SEO and accessibility reasons.
 * It ensures that the browser tab or screen reader readout displays the correct page title.
**/

const PageTitle = (props: PageTitleProps) => {
  
    const location = useLocation();

    useEffect(() => {
        document.title = props.title;
    }, [location, props.title]);
    
    return null

}

export default PageTitle