import React from 'react'

const ROLES = {
    'ADMIN':{fr:'Administrateur', en: 'Admin'},
    'CO': {fr:'chef de projet', en: 'project manager'},
    'DEV':{fr:'developpeur',en: 'developer'},
}

const useRole = (user_role, prefered_lang) => {
  const [permissions, setPermissions] = React.useState();
  const role = React.useMemo(() => user_role && ROLES[user_role][prefered_lang], [user_role, prefered_lang]);

  return { role }
}

export default useRole