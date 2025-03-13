"use client";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <motion.footer
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-gray-950 text-white py-6 px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between"
        >
            <div className="w-full flex justify-center md:justify-start">
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ amount: 0.3 }}
                    className="text-sm text-center"
                >
                    © {new Date().getFullYear()} Page by Emil Vento
                </motion.p>
            </div>
            <div className="flex space-x-6 items-center mt-4 md:mt-0 justify-end">
                  <motion.div   whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                      <a href="https://github.com/limehedelma" aria-label="GitHub">
                      <img src="github-icon.svg" alt="GitHub" width="25" /></a>
                  </motion.div>
              <motion.div       whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}>
                  <a href="mailto:lime.vento@outlook.com" aria-label="Email" >
                  <img src="email-icon.svg" alt="Email" width="25" />
              </a>
              </motion.div>
               <motion.div  whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} > <a href="http://discord.com/users/534676989198729217" aria-label="Discord" >
                   <img src="discord-icon.svg" alt="Discord" width="25" />
               </a></motion.div>

            </div>
        </motion.footer>
    );
}








