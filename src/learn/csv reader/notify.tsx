import React from 'react';
import { ReactNotifications, Store } from 'react-notifications-component'

interface Params {
    title: string,
    message: string,
    type?: "success" | "danger" | "info" | "default" | "warning" | undefined,
    insert?: "top" | "bottom" | undefined,
    container?:
        | "top-full"
        | "top-left"
        | "top-right"
        | "top-center"
        | "center"
        | "bottom-full"
        | "bottom-left"
        | "bottom-right"
        | "bottom-center";
    animationIn?: string[],
    animationOut?: string[],
    dismiss?: {
      duration?: number,
      onScreen?: boolean
    }
}

export default function Notify(params: Params){

    return (
        <div>
          <ReactNotifications/>
          {Store.addNotification({
                  title: params.title,
                  message: params.message,
                  type: params.type ? params.type : "success",
                  insert: params.insert,
                  container: params.container ? params.container : "top-center",
                  animationIn: params.animationIn ? params.animationIn : ["animate__animated", "animate__fadeIn"],
                  animationOut: params.animationOut ? params.animationOut : ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: params.dismiss?.duration ? params.dismiss.duration : 5000,
                    onScreen: params.dismiss?.onScreen ? params.dismiss.onScreen : true
                  }
          })}
        </div>
    );
}

